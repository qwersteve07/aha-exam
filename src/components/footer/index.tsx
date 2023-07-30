import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navList } from '../navbar';
import { ReactComponent as IconNav } from '../../assets/nav.svg';

function Footer() {
  const [currentNav, setCurrentNav] = useState(navList[0].id);
  const [tagHint, setTagHint] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('tags')) {
      setTagHint(false);
      setCurrentNav(navList[1].id);
    }
  }, []);

  return (
    <footer className="hidden md:flex  w-full bg-black-80  justify-center items-center min-h-[66px] ">
      <ul className="flex justify-center items-center gap-[50px]">
        {navList.map((item) => {
          const isActive = currentNav === item.id;
          const withHint = item.id === 'tags' && tagHint;

          return (
            <li
              className="relative"
              onClick={() => {
                setCurrentNav(item.id);
                if (item.id === 'tags') setTagHint(false);
              }}
            >
              <Link to={`/${item.id === 'home' ? '' : item.id}`} className="w-full flex justify-center items-center">
                <div className={
                  `relative
                  inline-flex
                  ${withHint
                  && 'before:absolute before:w-[6px] before:h-[6px] before:bg-blue before:rounded-full before:top-[-2px] before:right-[-6px]'}`
                }>
                  <IconNav className={isActive && '[&>path]:fill-white'} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

export default Footer;
