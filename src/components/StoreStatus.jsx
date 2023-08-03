import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';

StoreStatus.propTypes = {
  status: PropTypes.string.isRequired
};

StoreStatus.defaultProps = {
  status: 'active'
};

function StoreStatus({ status }) {
  switch (status) {
    case 'active':
      return (
        <span className='inline-flex flex-row items-center px-3 py-1 font-semibold text-green-700 bg-green-200 rounded-full gap-x-1'>
          Active
          <TiTick className='w-4 h-4' />
        </span>
      );
    case 'deleted':
      return (
        <span className='inline-flex flex-row items-center p-1 px-3 font-semibold text-red-700 bg-red-200 rounded-full gap-x-1'>
          Deleted
          <IoMdClose className='w-4 h-4' />
        </span>
      );
    case 'inactive':
      return (
        <span className='inline-flex flex-row items-center px-3 py-1 font-semibold text-yellow-700 bg-yellow-100 rounded-full gap-x-1'>
          Inactive
          <AiOutlineExclamationCircle className='w-4 h-4' />
        </span>
      );
    default:
      return null;
  }
}

export { StoreStatus };
