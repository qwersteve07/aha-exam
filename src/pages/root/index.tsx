import { Outlet } from 'react-router-dom';
import styles from './index.module.sass';
import Follows from '../../components/follows';

function RootPage() {
  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <Follows className={styles.follows} />
    </section>
  );
}

export default RootPage;
