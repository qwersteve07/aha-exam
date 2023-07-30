import { useEffect, useRef, useState } from 'react';
import Button from '../button';
import { UserType } from '../../types/user';
import Loading from '../loading';
import api from '../../services/api-source';
import mochiAvaterImage from '../../assets/mock-avater-image.jpeg';

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

const tabs = [
  { id: 'followers', name: 'Followers' },
  { id: 'following', name: 'Following' },
];

function Tab({ currentTab, setCurrentTab, tab }
  : {
    currentTab: string,
    setCurrentTab: (t: string) => void,
    tab: { id: string, name: string }
  }) {
  const isActive = tab.id === currentTab;
  return (
    <li
      className={`
      cursor-pointer
      text-center
      flex-1
      pb-[13px]
      text-base
      border-b-2
      border-solid
      transition duration-200
    hover:border-gray-80
      hover:transition
      hover:duration-200
      ${isActive ? 'text-white font-bold border-white' : 'text-gray-80 border-black-dark'}`}
      onClick={() => setCurrentTab(tab.id)}
    >
      {tab.name}
    </li>
  );
}

function User({ user }: { user: UserType }) {
  return (
    <li className="mb-[21px] flex justify-between items-center">
      <div className="flex justify-start items-center gap-[15px]">
        <div
          className="
            w-[40px]
            h-[40px]
            min-w-[40px]
            overflow-hidden
            rounded-[5px]
            border-[1px]
            border-solid
            border-gray-50"
        >
          <img className="w-full grayscale-[40%]" src={mochiAvaterImage} alt="avater" />
        </div>
        <div>
          <div className="text-white text-base">{user.name}</div>
          <div className="text-white-50 text-sm">
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
  );
}

function Follows() {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const [currentData, setCurrentData] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const followListRef = useRef<HTMLUListElement | null>(null);
  const isLoading = useRef(false);

  const loadFollowData = async (page: number) => {
    setLoading(true);
    let data: any;
    if (currentTab === 'followers') {
      data = await api.fetchFollowers(page);
    } else {
      data = await api.fetchFollowings(page);
    }
    setCurrentData((prev) => [...prev, ...data.data]);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentData([]);
    loadFollowData(currentPage);
  }, [currentTab]);


  useEffect(() => {
    const fetchCoins = async () => {
      if (!followListRef.current) return;

      const listHeight = followListRef.current.scrollHeight;
      const offset = followListRef.current.scrollTop;
      const containerHeight = followListRef.current.clientHeight;
      const scrollToBottom = listHeight - offset === containerHeight;
      if (!isLoading.current && scrollToBottom && totalPages !== currentPage) {
        isLoading.current = true;
        loadFollowData(currentPage + 1);
        isLoading.current = false;
      }
    };

    if (followListRef.current) {
      followListRef.current.addEventListener('scroll', fetchCoins);
    }

    return () => {
      if (followListRef.current) {
        followListRef.current.removeEventListener('scroll', fetchCoins);
      }
    };
  }, [currentPage, totalPages]);

  return (
    <aside className="w-full bg-black-light pt-[32px] large:hidden">
      <ul className="flex justify-between items-center">
        {tabs.map((item) => (
          <Tab
            currentTab={currentTab}
            setCurrentTab={(t) => {
              setCurrentTab(t);
              setCurrentPage(1);
            }}
            tab={item}
          />
        ))}
      </ul>
      <ul
        className="
        h-[calc(100dvh-71px)]
        overflow-y-auto
        px-[16px]
        py-[35px]
        no-scrollbar
        "
        ref={followListRef}
      >
        {currentData.map((item: UserType) => <User user={item} />)}
        {loading && <Loading />}
      </ul>
      {loading && <Loading />}
    </aside>
  );
}

export default Follows;
