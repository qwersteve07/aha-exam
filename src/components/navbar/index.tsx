import { CSSProperties, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import iconArrow from '../../assets/action.svg';
import { ReactComponent as IconNav } from '../../assets/nav.svg';

export const navList = [
  {
    id: 'home',
    name: 'Home',
    icon: <IconNav />,
  },
  {
    id: 'tags',
    name: 'Tags',
    icon: <IconNav />,
  },
];

function CommonNav() {
  const [currentNav, setCurrentNav] = useState(navList[0].id);
  const [tagHint, setTagHint] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('tags')) {
      setTagHint(false);
      setCurrentNav(navList[1].id);
    }
  }, []);

  const style: CSSProperties = {
    background: '-webkit-linear-gradient(left,#FF5C01,#FFD05D)',
    webkitBackgroundClip: "text",
    webkitTextFillColor: "transparent"
  };

  return (
    <nav className="
    bg-black-light
      md:w-full
      md:bg-black-dark
      md:h-[70px]
      md:px-[20px]
      md:py-0
      md:text-white
      md:text-2xl
      md:flex
      md:justify-start
      md:items-center"
    >
      <div
        className="
          h-[80px]
          text-[13px]
          font-bold
          flex
          items-center
          justify-center
          md:h-[70px]
          md:inline-flex
          md:justify-start
        "
        style={style}
      >
        LOGO
      </div>
      <ul className="md:hidden">
        {navList.map((item) => {
          const isActive = currentNav === item.id;
          const withHint = item.id === 'tags' && tagHint;

          return (
            <li
              key={item.id}
              className="mb-[40px] relative text-center cursor-pointer"
              onClick={() => {
                setCurrentNav(item.id);
                if (item.id === 'tags') setTagHint(false);
              }}
            >
              <Link to={`/${item.id === 'home' ? '' : item.id}`} className="w-full block">
                <div className={`
                relative
                inline-flex
                ${withHint
                  && (
                    'before:absolute before:w-[6px] before:h-[6px] before:bg-blue before:rounded-full before:top-[-2px] before:right-[-6px]')}
                `}
                >
                  <IconNav className={isActive ? '[&>path]:fill-white' : ''} />
                </div>
                <span className={`absolute bottom-[-15px] text-xs text-white w-full text-center ${isActive ? 'block' : 'hidden'}`}>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav >
  );
}


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const isNotHome = location.pathname !== '/';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
      } else if (window.innerWidth <= 768) {
        setIsMobile(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        {isNotHome
          && (
            <nav
              className="
              flex
              justify-start
              items-center
              w-full
              bg-black-dark
              h-[70px]
              px-[20px]
              py-0
              text-white
              text-2xl
              "
              onClick={() => navigate('/')}
            >
              <img className="mr-[13px]" src={iconArrow} alt="back" />
              {' '}
              Home Page
            </nav>
          )}
        {!isNotHome && <CommonNav />}
      </>
    );
  }
  return <CommonNav />;
}

export default Navbar;
