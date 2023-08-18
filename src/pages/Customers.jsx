import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaFileExport, FaSort } from 'react-icons/fa';
import { useMemo, useState } from 'react';
import { SortIcon, Pagination } from '../components';
import { getCustomers } from '../api/http';
import { customersPerPage } from '../constraint/constraint';
import { useForm } from 'react-hook-form';

function Customers() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const { register, handleSubmit } = useForm();
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [headerSort, setHeaderSort] = useState({ property: 'id', type: 'asc' });

  useEffect(() => {
    fetchData();
  }, [currentPage, searchValue, headerSort]);

  const fetchData = async () => {
    const response = await getCustomers(
      currentPage - 1,
      customersPerPage,
      searchValue,
      headerSort.property,
      headerSort.type
    );

    setCustomers(response?.body || []);
    setTotalCustomer(response?.totalCount || 0);
  };

  const pages = useMemo(() => {
    return Math.ceil(totalCustomer / customersPerPage);
  }, [totalCustomer]);

  const sortCustomers = (property, type) => {
    setHeaderSort({
      property,
      type
    });
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const onSubmit = (data) => {
    setSearchValue(data.text);
    setCurrentPage(1);
  };

  return (
    <main className={`w-30 my-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-8 text-2xl font-bold'>Customers</h1>
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
            placeholder='Search customers'
            autoComplete='off'
            {...register('text')}
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
                  if (headerSort.property === 'id' && headerSort.type === 'desc') sortCustomers('id', 'asc');
                  else sortCustomers('id', 'desc');
                }}
              >
                <div className='flex flex-row items-center gap-x-1'>
                  Customer
                  {headerSort.property !== 'id' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={headerSort.type} />
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
                  if (headerSort.property === 'name' && headerSort.type === 'desc') sortCustomers('name', 'asc');
                  else sortCustomers('name', 'desc');
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
              <th scope='col' className='w-32 px-4 py-3'>
                <div className='flex flex-row items-center gap-x-1'>Total Order</div>
              </th>
              <th scope='col' className='w-32 px-4 py-3'>
                <div className='flex flex-row items-center gap-x-1'>Total Spent</div>
              </th>
              <th scope='col' className='w-48 px-4 py-3'>
                <div className='flex flex-row items-center gap-x-1'>Last login</div>
              </th>
              <th scope='col' className='w-48 px-4 py-3'>
                <div className='flex flex-row items-center gap-x-1'>Last Order</div>
              </th>
            </tr>
          </thead>
          <tbody className='text-sm text-left text-gray-500'>
            {customers.map((customer) => (
              <tr key={`customer-${customer.id}`} className='border-b'>
                <td className='w-32 px-4 py-3 font-semibold text-blue-500 cursor-pointer hover:underline'>
                  #{customer.id}
                </td>
                <td className='w-32 px-4 py-3'>
                  <div>
                    <img src={customer.avatarUrl} className='object-cover object-center w-10 h-10 rounded-full' />
                  </div>
                </td>
                <td className='px-4 py-3 font-semibold text-black'>{customer.name}</td>
                <td className='px-4 py-3'>{customer.email}</td>
                <td className='w-40 px-4 py-3'>{customer.totalOrders}</td>
                <td className='w-32 px-4 py-3 font-semibold text-black'>{customer.totalSpent}</td>
                <td className='w-40 px-4 py-3 text-xs'>{customer.lastLoginDate}</td>
                <td className='w-40 px-4 py-3 text-xs'>{customer.lastOrderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          itemPerPage={customersPerPage}
          totalItems={totalCustomer}
          pages={pages}
          handleChangePage={handleChangePage}
        />
      </div>
    </main>
  );
}

export default Customers;
