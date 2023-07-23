import { Outlet } from 'react-router-dom';
import styles from './index.module.sass';
import Navbar from './components/navbar';

function App() {
  return (
    <div className={styles.app}>
      <Navbar className={styles.navbar} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
