import { navList } from "../navbar";
import classnames from 'classnames/bind';
import styles from './index.module.sass'
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as IconNav } from '../../assets/nav.svg'
const cx = classnames.bind(styles);

const Footer = () => {

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
        <footer className={styles.footer}>
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
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </footer>
    )
}

export default Footer;
