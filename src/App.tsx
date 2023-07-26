import { Outlet, useLocation } from 'react-router-dom';
import styles from './index.module.sass';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      {isHome && <Footer />}
    </div>
  );
}

export default App;
