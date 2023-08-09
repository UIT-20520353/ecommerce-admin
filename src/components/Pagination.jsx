import PropTypes from 'prop-types';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const Pagination = ({ currentPage, itemPerPage, totalItems, handleChangePage, pages }) => {
  return (
    <nav className={'py-3 text-sm flex flex-row items-center justify-between'}>
      <p className='text-black'>
        {totalItems === 0 ? '0' : currentPage * itemPerPage - itemPerPage + 1} to{' '}
        {itemPerPage * currentPage <= totalItems ? itemPerPage * currentPage : totalItems}
        <span className='text-gray-500'> Items of </span>
        {totalItems}
      </p>
      <div className='flex flex-row items-center'>
        <button
          disabled={currentPage === 1 || totalItems === 0}
          className='flex items-center justify-center text-xs font-medium text-gray-700 rounded-md w-7 h-7'
          onClick={() => handleChangePage(currentPage - 1)}
        >
          <MdOutlineNavigateBefore className={`w-5 h-5 ${currentPage === 1 && 'text-gray-300'}`} />
        </button>
        <ul className='flex flex-row items-center'>
          {[currentPage - 1, currentPage, currentPage + 1].map((page) => {
            if (page < 1 || page > pages) return null;

            return (
              <li key={`page-${page}`}>
                <button
                  className={`flex items-center justify-center text-xs font-medium rounded-md w-7 h-7 ${
                    currentPage === page ? 'bg-[#3874ff] text-white shadow-md' : 'text-gray-700'
                  }`}
                  onClick={() => handleChangePage(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          disabled={currentPage === pages || totalItems === 0}
          className='flex items-center justify-center text-xs font-medium text-gray-700 rounded-md w-7 h-7'
          onClick={() => handleChangePage(currentPage + 1)}
        >
          <MdOutlineNavigateNext
            className={`w-5 h-5 ${(currentPage === pages || totalItems === 0) && 'text-gray-300'}`}
          />
        </button>
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired
};

export { Pagination };
