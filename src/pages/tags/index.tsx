import styles from './index.module.sass';

const mockTags = [
  {
    id: 'cool',
    results: 350,
  }, {
    id: 'Beautiful',
    count: 210,
  }, {
    id: 'Easy',
    count: 190,
  },
  {
    id: 'Summary',
    count: 105,
  }, {
    id: 'Hot',
    questions: 80,
  }, {
    id: 'Passage Specific',
    questions: 50,
  },
];

function Tags() {
  return (
    <section className={styles['tags-page']}>
      <h2>Tags</h2>
      <ul>
        {
          mockTags.map((item) => (
            <li className={styles.tag}>
              <div className={styles.cover}>
                <div className={styles['tag-name']}>{item.id}</div>
              </div>
              <div className={styles.name}>{item.id}</div>
              <div className={styles.count}>
                {
                  'results' in item
                    ? `${item.results} Results`
                    : `${item.questions} Questions`
                }
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default Tags;
