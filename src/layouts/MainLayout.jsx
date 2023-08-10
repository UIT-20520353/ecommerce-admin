import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../components';

const MainLayout = () => {
  return (
    <div className=''>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
