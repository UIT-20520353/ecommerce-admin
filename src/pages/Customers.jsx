import { useSelector } from 'react-redux';
import { FaFileExport, FaSort } from 'react-icons/fa';
import { customers as data, itemsPerPage } from '../constraint/customers';
import { useMemo, useState } from 'react';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { SortIcon } from '../components';

function Customers() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([...data]);
  const [isSort, setIsSort] = useState({ property: '', type: '' });

  const pages = useMemo(() => {
    return Math.ceil(customers.length / itemsPerPage);
  }, [customers.length]);

  const pageList = useMemo(() => {
    const result = [];

    for (let i = currentPage - 2; i <= currentPage + 2; i++) if (i >= 1 && i <= pages) result.push(i);

    return result;
  }, [currentPage, pages]);

  function sortCustomers(property, type) {
    const temp = [...customers];
    if (type === 'asc') temp.sort((a, b) => (a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0));
    else temp.sort((a, b) => (a[property] < b[property] ? 1 : b[property] < a[property] ? -1 : 0));

    setIsSort({
      property,
      type
    });
    setCustomers(temp);
  }

  return (
    <main className={`w-30 mt-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-8 text-2xl font-bold'>Customers</h1>
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
            placeholder='Search customers'
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
                  if (isSort.property === 'id' && isSort.type === 'desc') sortCustomers('id', 'asc');
                  else sortCustomers('id', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Customer
                  {isSort.property !== 'id' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
                  )}
                </div>
              </th>
              <th scope='col' className='w-32 px-4 py-3'>
                Avatar
              </th>
              <th
                scope='col'
                className='px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (isSort.property === 'name' && isSort.type === 'desc') sortCustomers('name', 'asc');
                  else sortCustomers('name', 'desc');
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
              <th
                scope='col'
                className='w-32 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (isSort.property === 'totalOrders' && isSort.type === 'desc') sortCustomers('totalOrders', 'asc');
                  else sortCustomers('totalOrders', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Total Order
                  {isSort.property !== 'totalOrders' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
                  )}
                </div>
              </th>
              <th
                scope='col'
                className='w-32 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (isSort.property === 'totalSpent' && isSort.type === 'desc') sortCustomers('totalSpent', 'asc');
                  else sortCustomers('totalSpent', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Total Spent
                  {isSort.property !== 'totalSpent' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
                  )}
                </div>
              </th>
              <th
                scope='col'
                className='w-48 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (isSort.property === 'lastLogin' && isSort.type === 'desc') sortCustomers('lastLogin', 'asc');
                  else sortCustomers('lastLogin', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Last login
                  {isSort.property !== 'lastLogin' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
                  )}
                </div>
              </th>
              <th
                scope='col'
                className='w-48 px-4 py-3 cursor-pointer'
                onClick={() => {
                  if (isSort.property === 'lastOrder' && isSort.type === 'desc') sortCustomers('lastOrder', 'asc');
                  else sortCustomers('lastOrder', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Last Order
                  {isSort.property !== 'lastOrder' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={isSort.type} />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className='text-sm text-left text-gray-500'>
            {customers.map((customer, index) => {
              if (index >= currentPage * itemsPerPage - itemsPerPage && index <= currentPage * itemsPerPage)
                return (
                  <tr key={`customer-${customer.id}`} className='border-b'>
                    <td className='w-32 px-4 py-3 font-semibold text-blue-500 cursor-pointer hover:underline'>
                      #{customer.id}
                    </td>
                    <td className='w-32 px-4 py-3'>
                      <div>
                        <img src={customer.avatar} className='object-cover object-center w-10 h-10 rounded-full' />
                      </div>
                    </td>
                    <td className='px-4 py-3 font-semibold text-black'>{customer.name}</td>
                    <td className='px-4 py-3'>{customer.email}</td>
                    <td className='w-40 px-4 py-3'>{customer.totalOrders}</td>
                    <td className='w-32 px-4 py-3 font-semibold text-black'>{customer.totalSpent}</td>
                    <td className='w-40 px-4 py-3 text-xs'>{customer.lastLogin}</td>
                    <td className='w-40 px-4 py-3 text-xs'>{customer.lastOrder}</td>
                  </tr>
                );
              else return;
            })}
          </tbody>
        </table>
        <nav className={'py-3 text-sm flex flex-row items-center justify-between'}>
          <p className='text-black'>
            {currentPage * itemsPerPage - itemsPerPage + 1} to{' '}
            {itemsPerPage * currentPage <= customers.length ? itemsPerPage * currentPage : customers.length}
            <span className='text-gray-500'> Items of </span>
            {customers.length}
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

export default Customers;
