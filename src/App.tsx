import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="grid grid-cols-[80px_1fr] h-screen md:flex md:justify-between md:items-center md:flex-col">
      <Navbar />
      <main className="bg-black-dark overflow-y-auto h-full w-full no-scrollbar">
        <Outlet />
      </main>
      {isHome && <Footer />}
    </div>
  );
}

export default App;
