import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button';
import Search from '../../../components/search';
import Slider from '../../../components/slider';
import { useState } from 'react';
import PageTitle from '../../../components/page-title';

const HomePage = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(3)

  return (
    <div className="w-full h-full flex-col flex justify-between items-start">
      <div className='w-full'>
        <PageTitle>Search</PageTitle>
        <Search keyword={keyword} setKeyword={setKeyword} />
        <Slider setPageSize={setPageSize} />
      </div>
      <div className="mb-[33px] md:mb-[24px]">
        <Button onClick={() => navigate(`/search?pageSize=${pageSize}&keyword=${keyword}`)} >SEARCH</Button>
      </div>
    </div>
  )
}

export default HomePage;
