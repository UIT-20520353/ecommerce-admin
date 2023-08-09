import { FaFileExport, FaSort, FaTrash } from 'react-icons/fa';
import { TiMinus, TiTick } from 'react-icons/ti';
import { SortIcon, StoreStatus } from '../components';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { bulkDeleteShops, deleteShopById, getAllShops, getShops } from '../api/http';
import { getSession } from '../utils/utils';
import { shopsPerPage } from '../constraint/constraint';
import { Pagination } from '../components/Pagination';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function Stores() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const session = getSession();
  const { register, handleSubmit } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [stores, setStores] = useState([]);
  const [totalShop, setTotalShop] = useState(0);
  const [headerSort, setHeaderSort] = useState({ property: 'id', type: 'asc' });
  const [searchValue, setSearchValue] = useState('');
  const [headerSelect, setHeaderSelect] = useState('none');
  const [selectedStores, setSelectedStores] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchValue, headerSort]);

  useEffect(() => {
    if (selectedStores.length > 0 && selectedStores.length < totalShop) setHeaderSelect('minus');
    else if (selectedStores.length === totalShop) setHeaderSelect('tick');
    else if (selectedStores.length === 0) setHeaderSelect('none');
  }, [selectedStores.length, totalShop]);

  const fetchData = async () => {
    const session = getSession();

    const response = await getShops(
      session?.accessToken,
      currentPage - 1,
      shopsPerPage,
      searchValue,
      headerSort.property,
      headerSort.type
    );

    setStores(response.data);
    setTotalShop(response.totalCount);
  };

  const pages = useMemo(() => {
    return Math.ceil(totalShop / shopsPerPage);
  }, [totalShop]);

  const sortStores = (property, type) => {
    setHeaderSort({
      property,
      type
    });
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteItem = (id) => {
    deleteShopById(session.accessToken, id).then((response) => {
      if (response) {
        toast('Xóa shop thành công!', {
          type: 'success',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });

        fetchData();
      } else {
        toast('Xảy ra lỗi khi xóa shop!', {
          type: 'error',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000
        });
      }
    });
  };

  const onSubmit = (data) => {
    setSearchValue(data.text);
    setCurrentPage(1);
  };

  const handleHeaderCheckboxClick = () => {
    if (headerSelect === 'tick' || headerSelect === 'minus') {
      setHeaderSelect('none');
      setSelectedStores([]);
      return;
    }

    getAllShops(session?.accessToken)
      .then((data) => {
        const temp = [];
        data.forEach((store) => {
          temp.push(store.id);
        });
        setHeaderSelect('tick');
        setSelectedStores(temp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleItemCheckboxClick = (id) => {
    if (selectedStores.includes(id)) {
      const temp = selectedStores.filter((store) => store !== id);
      setSelectedStores(temp);
    } else {
      const temp = [...selectedStores];
      temp.push(id);
      setSelectedStores(temp);
    }
  };

  const handleBulkDelete = async () => {
    const response = await bulkDeleteShops(session?.accessToken, selectedStores);
    if (response) {
      toast('Xóa shop thành công!', {
        type: 'success',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      });

      fetchData();
    } else {
      toast('Xảy ra lỗi khi xóa shop!', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
      });
    }
  };

  return (
    <main className={`w-30 mt-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-8 text-2xl font-bold'>Stores</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row items-center justify-between mx-12'>
        <div className='relative w-1/4'>
          <div className='absolute inset-y-0 flex items-center pl-3 pointer-events-none left-2'>
            <svg
              className='w-4 h-4 text-gray-500'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='search-stores'
            className='block w-full p-3 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-blue-200 focus:outline-1 bg-gray-50 focus:outline-offset-1'
            placeholder='Search stores'
            autoComplete='off'
            {...register('text')}
          />
        </div>
        <div className='flex flex-row items-center gap-x-4'>
          <button
            type='button'
            className={`px-4 py-2 text-sm text-white duration-200 flex flex-row items-center gap-x-2 bg-red-600 rounded-md shadow-md hover:bg-red-700 ${
              selectedStores.length === 0 ? 'hidden' : 'flex'
            }`}
            onClick={handleBulkDelete}
          >
            <FaTrash />
            Delete Selected Items
          </button>
          <button type='button' className='flex flex-row items-center gap-x-2 group'>
            <FaFileExport className='w-4 h-4' />
            <span className='text-sm font-medium group-hover:underline'>Export</span>
          </button>
        </div>
      </form>
      <div className='px-10 overflow-x-auto bg-white border-t border-b my-7'>
        <table className='w-full bg-white '>
          <thead className='text-sm font-medium text-left uppercase border-b '>
            <tr>
              <th onClick={handleHeaderCheckboxClick}>
                <div
                  className={`w-[13px] h-[13px] border border-gray-500 rounded-sm cursor-pointer flex items-center justify-center ${
                    headerSelect === 'none' ? 'bg-white' : 'bg-blue-500'
                  }`}
                >
                  <TiTick className={`w-full h-full text-white ${headerSelect === 'tick' ? 'block' : 'hidden'}`} />
                  <TiMinus className={`w-full h-full text-white ${headerSelect === 'minus' ? 'block' : 'hidden'}`} />
                </div>
              </th>
              <th
                scope='col'
                className='w-32 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (headerSort.property === 'id' && headerSort.type === 'desc') sortStores('id', 'asc');
                  else sortStores('id', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Store
                  {headerSort.property !== 'id' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={headerSort.type} />
                  )}
                </div>
              </th>
              <th scope='col' className='w-32 px-4 py-3'>
                Logo
              </th>
              <th
                scope='col'
                className='px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (headerSort.property === 'name' && headerSort.type === 'desc') sortStores('name', 'asc');
                  else sortStores('name', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Name
                  {headerSort.property !== 'name' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={headerSort.type} />
                  )}
                </div>
              </th>
              <th scope='col' className='px-4 py-3'>
                Email
              </th>
              <th scope='col' className='w-40 px-4 py-3'>
                Phone
              </th>
              <th
                scope='col'
                className='w-32 px-4 py-3'
                // onClick={() => {
                //   if (headerSort.property === 'totalProducts' && headerSort.type === 'desc')
                //     sortStores('totalProducts', 'asc');
                //   else sortStores('totalProducts', 'desc');
                // }}
              >
                {/* <div className='flex flex-row items-center gap-x-1'>
                  Total Products
                  {headerSort.property !== 'totalProducts' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={headerSort.type} />
                  )}
                </div> */}
                Total Products
              </th>
              <th
                scope='col'
                className='w-40 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (headerSort.property === 'status' && headerSort.type === 'desc') sortStores('status', 'asc');
                  else sortStores('status', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Status
                  {headerSort.property !== 'status' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={headerSort.type} />
                  )}
                </div>
              </th>
              <th scope='col' className='w-32 px-4 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='text-sm text-left text-gray-500'>
            {stores.map((store) => (
              <tr key={`store-${store.id}`} className='border-b'>
                <td className=''>
                  <div>
                    <input
                      checked={selectedStores.includes(store.id)}
                      onChange={() => handleItemCheckboxClick(store.id)}
                      id={`checkbox-store-${store.id}`}
                      className='cursor-pointer'
                      type='checkbox'
                    />
                  </div>
                </td>
                <td className='w-32 px-4 py-3 font-semibold text-blue-500'>#{store.id}</td>
                <td className='w-32 px-4 py-3'>
                  <div>
                    <img src={store.logoUrl} className='object-cover object-center w-10 h-10 rounded-full' />
                  </div>
                </td>
                <td className='px-4 py-3 font-semibold text-black'>{store.name}</td>
                <td className='px-4 py-3'>{store.email}</td>
                <td className='w-40 px-4 py-3'>{store.phone}</td>
                <td className='w-32 px-4 py-3 font-semibold text-black'>{store.totalProducts}</td>
                <td className='w-40 px-4 py-3 text-xs uppercase'>
                  <StoreStatus status={store.status} />
                </td>
                <td className='w-32 px-4 py-3'>
                  {store.status !== 'DELETED' && (
                    <button
                      className='font-medium text-red-600 hover:underline'
                      onClick={() => handleDeleteItem(store.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          itemPerPage={shopsPerPage}
          totalItems={totalShop}
          pages={pages}
          handleChangePage={handleChangePage}
        />
      </div>
    </main>
  );
}

export default Stores;
