import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import iconArrow from '../../../assets/action.svg';
import api from '../../../services/api-source';
import { SearchResultType } from '../../../types/search-result';
import mochiResultImage from '../../../assets/mock-result-image.png';
import Button from '../../../components/button';
import Loading from '../../../components/loading';
import PageTitle from '../../../components/page-title';

function SearchResultsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [results, setResults] = useState<SearchResultType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const pageSize = parseInt(params.get('pageSize') || '3');
  const keyword = params.get('keyword') || '';

  const loadSearchResults = async (page: number) => await api.fetchSearchResults({ page, pageSize, keyword });

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      const data = await loadSearchResults(1);
      setLoading(false);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setResults(data.data);
    };
    initFetch();
  }, []);

  const loadMoreSearchResults = async () => {
    setLoading(true);
    const data = await loadSearchResults(currentPage + 1);
    setLoading(false);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setResults((prev) => [...prev, ...data.data]);
  };


  return (
    <div className="w-full">
      <PageTitle className="text-[30px] relative">
        <img className="
          absolute
          left-[-50px]
          top-[10px]
          cursor-pointer"
          src={iconArrow}
          onClick={() => navigate(-1)}
          alt="back"
        />
        {' '}
        Results
      </PageTitle>
      <ul className="w-full grid grid-cols-[repeat(3,minmax(220px,1fr))] gap-x-[35px] gap-y-[30px] mb-[40px] md:block">
        {
          results.map((item: SearchResultType) => (
            <li key={item.id} className="md:mb-[40px]">
              <div
                className="bg-cover mb-[12px] aspect-[1.5]"
                style={{ backgroundImage: `url(${mochiResultImage})` }}
              />
              <div className="text-[15px] overflow-hidden whitespace-nowrap text-white">{item.name}</div>
              <div className="text-[11px] text-gray-40">
                by
                {' '}
                {item.username}
              </div>
            </li>
          ))
        }
      </ul>
      {loading && <Loading />}
      {currentPage !== totalPages && <Button onClick={loadMoreSearchResults}>More</Button>}

    </div>
  );
}

export default SearchResultsPage;
