import { useEffect, useState } from 'react';
import styles from './index.module.sass';
import Button from '../button';
import { UserType } from '../../types/user';
import Loading from '../loading';
import api from '../../services/api-source';
import mochiAvaterImage from '../../assets/mock-avater-image.jpeg'

const tabs = [
  { id: 'followers', name: 'Followers' },
  { id: 'following', name: 'Following' },
];

export type FollowDataProps = {
  followers: {
    page: number,
    pageSize: number,
    total: number,
    totalPages: number
    data: UserType[]
  };
  following: {
    page: number,
    pageSize: number,
    total: number,
    totalPages: number
    data: UserType[]
  }
}

type FollowsProps = {
  className: string;
  // data: FollowDataProps
}

function Follows({ className }: FollowsProps) {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setCurrentData([])
      let data;
      if (currentTab === 'followers') {
        data = await loadFollowers(currentPage);
      } else {
        data = await loadFollowings(currentPage)
      }
      setCurrentData(data.data);
      setTotalPages(data.totalPages)
      setLoading(false)
    }

    loadData()
  }, [currentTab]);

  const loadFollowers = async (page: number) => {
    return await api.fetchFollowers(page);
  }

  const loadFollowings = async (page: number) => {
    return await api.fetchFollowings(page);
  }

  return (
    <aside className={`${className} ${styles.follows}`}>
      <ul className={styles.tabs}>
        {tabs.map((item) => <Tab currentTab={currentTab} setCurrentTab={(t) => {
          setCurrentTab(t)
          setCurrentPage(1)
        }} tab={item} />)}
      </ul>
      <ul className={styles.list}>
        {currentData.map((item: UserType) => <User user={item} />)}
        {loading && <Loading />}
      </ul>
    </aside>
  );
}

const Tab = ({ currentTab, setCurrentTab, tab }
  : {
    currentTab: string,
    setCurrentTab: (t: string) => void,
    tab: { id: string, name: string }
  }) => {
  return (
    <li
      className={tab.id === currentTab ? styles.active : ''}
      onClick={() => setCurrentTab(tab.id)}
    >
      {tab.name}
    </li>
  )
}

const User = ({ user }: { user: UserType }) => {
  return (
    <li>
      <div className={styles.user}>
        <div className={styles.avatar}><img src={mochiAvaterImage} /></div>
        <div className={styles.info}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.id}>
            @
            {user.id}
          </div>
        </div>
      </div>
      <Button
        type={user.isFollowing ? 'contained' : 'outlined'}
        onClick={() => { }}
      >
        {user.isFollowing ? 'Following' : 'Follow'}
      </Button>
    </li>
  )
}

export default Follows;
