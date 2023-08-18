import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getShopDetail } from '../api/http';
import { toast } from 'react-toastify';
import { AiOutlineEdit } from 'react-icons/ai';
import { LuEdit } from 'react-icons/lu';
import { EditStoreDetail } from '../components';
import { ChangeStoreLogo } from '../components/ChangeStoreLogo';

const StoreDetail = () => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [isChangeDetail, setIsChangeDetail] = useState(false);
  const [isChangeLogo, setIsChangeLogo] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getShopDetail();
    if (response.ok) {
      setData(response.body);
    } else {
      toast('Xảy ra lỗi khi lấy thông tin cửa hàng', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
        autoClose: 5000
      });
      setData(response.body);
    }
  };

  const handleOpenChangeDetail = () => {
    setIsChangeDetail(true);
  };
  const handleCloseChangeDetail = () => {
    setIsChangeDetail(false);
    fetchData();
  };
  const handleOpenChangeLogo = () => {
    setIsChangeLogo(true);
  };
  const handleCloseChangeLogo = () => {
    setIsChangeLogo(false);
    fetchData();
  };

  return (
    <main className={`w-30 my-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-8 text-2xl font-bold'>Store detail</h1>
      <div className='px-5 py-3 mx-12 bg-white rounded-md shadow-md'>
        <div className='flex flex-row items-center gap-x-8'>
          <div className='relative group'>
            <img
              src={data?.logoUrl}
              className='object-cover object-center w-56 h-56 duration-300 border rounded-full group-hover:opacity-30'
            />
            <button
              className='absolute items-center justify-center hidden w-20 h-20 duration-300 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-50 top-1/2 left-1/2 group-hover:flex'
              onClick={handleOpenChangeLogo}
            >
              <AiOutlineEdit className='w-8 h-8' />
            </button>
          </div>
          <div className='space-y-3'>
            <div className='flex flex-row items-center gap-x-2'>
              <p className='text-xl font-semibold'>{data?.name}</p>
              <button onClick={handleOpenChangeDetail}>
                <LuEdit className='w-5 h-5' />
              </button>
            </div>
            <div className='text-sm'>
              <p className='font-medium text-black'>Email</p>
              <p className='text-gray-600'>{data?.email}</p>
            </div>
            <div className='text-sm'>
              <p className='font-medium text-black'>Phone</p>
              <p className='text-gray-600'>{data?.phone}</p>
            </div>
          </div>
        </div>

        <div className='w-full h-[1px] bg-gray-300 my-5'></div>

        <div className='text-sm text-gray-600'>
          <p>Total products</p>
          <p className='text-lg font-medium text-black'>{data?.totalProducts}</p>
        </div>
      </div>

      {isChangeDetail && <EditStoreDetail storeDetail={data} closeForm={handleCloseChangeDetail} />}
      {isChangeLogo && <ChangeStoreLogo closeForm={handleCloseChangeLogo} />}
    </main>
  );
};

export default StoreDetail;
