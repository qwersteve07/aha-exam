import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button';
import Search from '../../../components/search';
import Slider from '../../../components/slider';
import styles from './index.module.sass';
import { useState } from 'react';
import PageTitle from '../../../components/page-title';

const HomePage = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(3)

  return (
    <div className={styles['home-page']}>
      <div>
        <PageTitle>Search</PageTitle>
        <Search keyword={keyword} setKeyword={setKeyword} />
        <Slider setPageSize={setPageSize} />
      </div>
      <div className={styles.button}>
        <Button onClick={() => navigate(`/search?pageSize=${pageSize}&keyword=${keyword}`)} >SEARCH</Button>
      </div>
    </div>
  )
}

export default HomePage;
