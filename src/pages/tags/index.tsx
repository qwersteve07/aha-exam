import { useLoaderData } from 'react-router-dom';
import styles from './index.module.sass';
import { TagType } from '../../types/tags';
import PageTitle from '../../components/page-title';

function TagsPage() {
  const tagsList = useLoaderData() as TagType[];

  return (
    <section className={styles['tags-page']}>
      <PageTitle className={styles.title}>Tags</PageTitle>
      <ul>
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
