import styles from './index.module.sass';
import { TagType } from '../../types/tags';
import PageTitle from '../../components/page-title';
import { useEffect, useState } from 'react';
import api from '../../services/api-source';
import Loading from '../../components/loading';

function TagsPage() {
  const [loading, setLoading] = useState(false)
  const [tagsList, setTagsList] = useState<TagType[]>([])

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true)
      const data = await api.fetchTags()
      setLoading(false)
      setTagsList(data)
    }
    initFetch()
  }, [])

  return (
    <section className={styles['tags-page']}>
      <PageTitle className={styles.title}>Tags</PageTitle>
      <ul>
        {tagsList.length === 0 && <Loading />}
        {
          tagsList.map((item: TagType) => (
            <li className={styles.tag} key={item.id}>
              <div className={styles.cover}>
                <div className={styles['tag-name']}>{item.name}</div>
              </div>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.count}>
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
