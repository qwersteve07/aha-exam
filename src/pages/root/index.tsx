import { Outlet } from 'react-router-dom';
import Follows from '../../components/follows';

function RootPage() {
  return (
    <section className="grid grid-cols-[1fr_375px] h-full large:grid-cols-1">
      <div className='
        px-[130px]
        py-[54px]
        w-full
        h-full
        flex
        justify-between
        items-start
        flex-col
        overflow-y-auto
        no-scrollbar
        medium:py-[54px]
        medium:px-[100px]
        md:px-[20px]
        md:py-[20px]
      '>
        <Outlet />
      </div>
      <Follows />
    </section>
  );
}

export default RootPage;
