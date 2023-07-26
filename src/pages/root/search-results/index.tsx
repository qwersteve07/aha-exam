import styles from './index.module.sass';
import iconArrow from '../../../assets/action.svg'
import api from '../../../services/api-source';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchResultType } from '../../../types/search-result';
import { useEffect, useState } from 'react';
import mochiResultImage from '../../../assets/mock-result-image.png'
import Button from '../../../components/button';
import Loading from '../../../components/loading';
import PageTitle from '../../../components/page-title';

const SearchResultsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [results, setResults] = useState<SearchResultType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const pageSize = parseInt(params.get('pageSize') || '3')
  const keyword = params.get('keyword') || ''

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true)
      const data = await loadSearchResults(1)
      setLoading(false)
      setCurrentPage(data.page)
      setTotalPages(data.totalPages)
      setResults(data.data)
    }
    initFetch()
  }, [])

  const loadMoreSearchResults = async () => {
    setLoading(true)
    const data = await loadSearchResults(currentPage + 1)
    setLoading(false)
    setCurrentPage(data.page)
    setTotalPages(data.totalPages)
    setResults((prev) => [...prev, ...data.data])
  }

  const loadSearchResults = async (page: number) => {
    return await api.fetchSearchResults({ page, pageSize, keyword })
  }

  return (
    <div className={styles['search-results-page']}>
      <PageTitle className={styles.title}>
        <img src={iconArrow} onClick={() => navigate(-1)} /> Results
      </PageTitle>
      <ul>
        {
          results.map((item: SearchResultType) => (
            <li className={styles.result} key={item.id}>
              <div className={styles.cover} style={{ backgroundImage: `url(${mochiResultImage})` }} />
              <div className={styles.name}>{item.name}</div>
              <div className={styles.username}>
                by {item.username}
              </div>
            </li>
          ))
        }
      </ul>
      {loading && <Loading />}
      {currentPage !== totalPages && <Button onClick={loadMoreSearchResults}>More</Button>}

    </div>
  )
}

export default SearchResultsPage;
