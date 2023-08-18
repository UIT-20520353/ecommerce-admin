// import { Outlet } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getSession } from '../utils/utils';
import { Header, Sidebar } from '../components';

import Stores from '../pages/Stores';
import Customers from '../pages/Customers';
import StoreDetail from '../pages/StoreDetail';
import Categories from '../pages/Categories';
import Tags from '../pages/Tags';
import Products from '../pages/Products';

const getRole = () => {
  const session = getSession();
  if (!session) return 'ADMIN';

  const temp = jwtDecode(session?.accessToken);
  return temp.authorities[0];
};

const MainLayout = () => {
  return (
    <div className=''>
      <Header />
      <Sidebar />
      <Routes>
        <Route index element={getRole() === 'ADMIN' ? <Stores /> : <StoreDetail />} />
        <Route path={'customers'} element={<Customers />} />
        <Route path={'categories'} element={<Categories />} />
        <Route path={'tags'} element={<Tags />} />
        <Route path={'products'} element={<Products />} />
      </Routes>
    </div>
  );
};

export default MainLayout;
