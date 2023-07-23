import styles from './index.module.sass';
import Search from '../../components/search';
import Slider from '../../components/slider';
import Button from '../../components/button';
import Follows from '../../components/follows';

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.content}>
        <div className={styles.params}>
          <Search />
          <Slider />
        </div>
        <Button onClick={() => { }}>SEARCH</Button>
      </div>
      <Follows className={styles.follows} />
    </section>
  );
}

export default Home;
