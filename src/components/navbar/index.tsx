import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.sass';
import iconArrow from '../../assets/action.svg'
import { ReactComponent as IconNav } from '../../assets/nav.svg'
const cx = classnames.bind(styles);

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


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false)
  console.log(location.pathname)
  const isNotHome = location.pathname !== '/'

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false)
      } else if (window.innerWidth <= 768) {
        setIsMobile(true)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  console.log(isMobile)

  if (isMobile) {
    return (
      <>
        {isNotHome &&
          <nav className={`${styles.navbar} ${styles.mobile}`} onClick={() => navigate('/')}>
            <img src={iconArrow} /> Home Page
          </nav>
        }
        {!isNotHome && <CommonNav />}
      </>
    )
  }

  return <CommonNav />
}

const CommonNav = () => {

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
    <nav className={styles.navbar}>
      <div className={styles.logo}>LOGO</div>
      <ul>
        {navList.map((item) => {
          const navClass = cx({
            active: currentNav === item.id,
            hint: item.id === 'tags' && tagHint,
          });

          return (
            <li
              className={navClass}
              onClick={() => {
                setCurrentNav(item.id);
                if (item.id === 'tags') setTagHint(false);
              }}
            >
              <Link to={`/${item.id === 'home' ? '' : item.id}`}>
                <div className={styles.icon}>
                  <IconNav />
                </div>
                <span className={styles.name}>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default Navbar;
