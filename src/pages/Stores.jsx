import { FaFileExport, FaSort } from 'react-icons/fa';
import { SortIcon, StoreStatus } from '../components';
import { stores as data, itemsPerPage } from '../constraint/stores';
import { useMemo, useState } from 'react';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { useSelector } from 'react-redux';

function Stores() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [currentPage, setCurrentPage] = useState(1);
  const [stores, setStores] = useState([...data]);
  const [isSort, setIsSort] = useState({ property: '', type: '' });

  const pages = useMemo(() => {
    return Math.ceil(stores.length / itemsPerPage);
  }, [stores.length]);

  const pageList = useMemo(() => {
    const result = [];

    for (let i = currentPage - 2; i <= currentPage + 2; i++) if (i >= 1 && i <= pages) result.push(i);

    return result;
  }, [currentPage, pages]);

  function sortStores(property, type) {
    const temp = [...stores];
    if (type === 'asc') temp.sort((a, b) => (a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0));
    else temp.sort((a, b) => (a[property] < b[property] ? 1 : b[property] < a[property] ? -1 : 0));

    setIsSort({
      property,
      type
    });
    setStores(temp);
  }

  return (
    <main className={`w-30 mt-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-8 text-2xl font-bold'>Stores</h1>
      <form className='flex flex-row items-center justify-between mx-12'>
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
          />
        </div>
        <button type='button' className='flex flex-row items-center gap-x-2 group'>
          <FaFileExport className='w-4 h-4' />
          <span className='text-sm font-medium group-hover:underline'>Export</span>
        </button>
      </form>
      <div className='px-10 overflow-x-auto bg-white border-t border-b my-7'>
        <table className='w-full bg-white '>
          <thead className='text-sm font-medium text-left uppercase border-b '>
            <tr>
              <th
                scope='col'
                className='w-32 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (isSort.property === 'id' && isSort.type === 'desc') sortStores('id', 'asc');
                  else sortStores('id', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Store
                  {isSort.property !== 'id' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
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
                  if (isSort.property === 'name' && isSort.type === 'desc') sortStores('name', 'asc');
                  else sortStores('name', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Name
                  {isSort.property !== 'name' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
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
                className='w-32 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (isSort.property === 'totalProducts' && isSort.type === 'desc') sortStores('totalProducts', 'asc');
                  else sortStores('totalProducts', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Total Products
                  {isSort.property !== 'totalProducts' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
                  )}
                </div>
              </th>
              <th
                scope='col'
                className='w-40 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (isSort.property === 'status' && isSort.type === 'desc') sortStores('status', 'asc');
                  else sortStores('status', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Status
                  {isSort.property !== 'status' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
                  )}
                </div>
              </th>
              <th scope='col' className='w-32 px-4 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='text-sm text-left text-gray-500'>
            {stores.map((store, index) => {
              if (index >= currentPage * itemsPerPage - itemsPerPage && index <= currentPage * itemsPerPage)
                return (
                  <tr key={`store-${store.id}`} className='border-b'>
                    <td className='w-32 px-4 py-3 font-semibold text-blue-500 cursor-pointer hover:underline'>
                      #{store.id}
                    </td>
                    <td className='w-32 px-4 py-3'>
                      <div>
                        <img src={store.logo} className='object-cover object-center w-10 h-10 rounded-full' />
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
                      <button className='font-medium text-red-600 hover:underline'>Delete</button>
                    </td>
                  </tr>
                );
              else return;
            })}
          </tbody>
        </table>
        <nav className={'py-3 text-sm flex flex-row items-center justify-between'}>
          <p className='text-black'>
            {currentPage * itemsPerPage - itemsPerPage + 1} to{' '}
            {itemsPerPage * currentPage <= stores.length ? itemsPerPage * currentPage : stores.length}
            <span className='text-gray-500'> Items of </span>
            {stores.length}
          </p>
          <div className='flex flex-row items-center'>
            <button
              disabled={currentPage === 1}
              className='flex items-center justify-center text-xs font-medium text-gray-700 rounded-md w-7 h-7'
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <MdOutlineNavigateBefore className={`w-5 h-5 ${currentPage === 1 && 'text-gray-300'}`} />
            </button>
            <ul className='flex flex-row items-center'>
              {pageList.map((page) => {
                return (
                  <li key={`page-${page}`}>
                    <button
                      className={`flex items-center justify-center text-xs font-medium rounded-md w-7 h-7 ${
                        currentPage === page ? 'bg-[#3874ff] text-white shadow-md' : 'text-gray-700'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              disabled={currentPage === pages}
              className='flex items-center justify-center text-xs font-medium text-gray-700 rounded-md w-7 h-7'
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <MdOutlineNavigateNext className={`w-5 h-5 ${currentPage === pages && 'text-gray-300'}`} />
            </button>
          </div>
        </nav>
      </div>
    </main>
  );
}

export default Stores;
