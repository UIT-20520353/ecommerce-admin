import PropTypes from 'prop-types';
import { FaFileExport, FaTrash, FaPlus } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import { useForm } from 'react-hook-form';

const TableHeader = ({ onSubmit, btnAdd, bulkDelete, placeHolder }) => {
  const { register, handleSubmit } = useForm();

  return (
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
          placeholder={placeHolder}
          autoComplete='off'
          {...register('text')}
        />
      </div>
      <div className='flex flex-row items-center gap-x-5'>
        <button
          type='button'
          className={`px-4 py-2 text-sm text-white duration-200 flex flex-row items-center gap-x-2 bg-red-600 rounded-md shadow-md hover:bg-red-700 ${
            bulkDelete.selectedRows.length === 0 ? 'hidden' : 'flex'
          }`}
          onClick={bulkDelete.handleClick}
        >
          <FaTrash />
          Delete Selected Items
        </button>
        <button
          type='button'
          className={
            'px-4 py-2 text-sm text-white duration-200 flex flex-row items-center gap-x-2 bg-blue-600 rounded-md shadow-md hover:bg-blue-700'
          }
          onClick={btnAdd.handleClick}
        >
          <FaPlus />
          {btnAdd.text}
        </button>
        <CSVLink
          data={[]}
          // data={storesExport}
          // headers={headers}
          filename={'Stores.csv'}
          className='flex flex-row items-center gap-x-2 group'
          asyncOnClick={true}
          // onClick={(event, done) => {
          //   handleExportClick(done);
          // }}
        >
          <FaFileExport className='w-4 h-4' />
          <span className='text-sm font-medium group-hover:underline'>Export</span>
        </CSVLink>
      </div>
    </form>
  );
};

TableHeader.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  btnAdd: PropTypes.object.isRequired,
  bulkDelete: PropTypes.object.isRequired,
  placeHolder: PropTypes.string.isRequired
};

export { TableHeader };
