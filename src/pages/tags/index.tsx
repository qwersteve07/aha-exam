import { useEffect, useState } from 'react';
import { TagType } from '../../types/tags';
import PageTitle from '../../components/page-title';
import api from '../../services/api-source';
import Loading from '../../components/loading';

function TagsPage() {
  const [loading, setLoading] = useState(false);
  const [tagsList, setTagsList] = useState<TagType[]>([]);

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      const data = await api.fetchTags();
      setLoading(false);
      setTagsList(data);
    };
    initFetch();
  }, []);

  return (
    <section className="
      px-[255px]
      py-[54px]
      large:px-[130px]
      medium:px-[100px]
      md:px-[25px]
      md:py-[20px]
    "
    >
      <PageTitle className="text-[30px] mb-[24px]">Tags</PageTitle>
      <ul className="
        w-full
        grid
        gap-x-[24px]
        gap-y-[24px]
        grid-cols-[repeat(2,calc(50%-12px))]
        lg:grid-cols-[repeat(4,minmax(150px,1fr))]
        xl:grid-cols-[repeat(5,minmax(150px,1fr))]
        xl:gap-y-[36px]

      "
      >
        {(tagsList.length === 0 || loading) && <Loading />}
        {
          tagsList.map((item: TagType) => (
            <li key={item.id}>
              <div className="
                bg-white-10
                flex
                justify-start
                items-end
                px-[14px]
                py-[10px]
                mb-[10px]
                rounded-[10px]
                aspect-[1]"
              >
                <div className="
                  rounded-[8px]
                  border-4
                  border-solid
                  border-white
                  px-[14px]
                  py-[7px]
                  text-2xl
                  font-bold
                  truncate
                  text-white"
                >
                  {item.name}
                </div>
              </div>
              <div className="text-[15px] text-white">{item.name}</div>
              <div className="text-[11px] text-gray-40">
                {item.count}
                {' '}
                Results
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default TagsPage;
