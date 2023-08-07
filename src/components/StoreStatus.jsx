import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { useMemo } from 'react';

StoreStatus.propTypes = {
  status: PropTypes.string.isRequired
};

StoreStatus.defaultProps = {
  status: 'active'
};

function StoreStatus({ status }) {
  const styles = useMemo(() => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-200';
      case 'deleted':
        return 'text-red-700 bg-red-200';
      case 'inactive':
        return 'text-yellow-700 bg-yellow-100';
      default:
        return '';
    }
  }, [status]);

  return (
    <span className={`inline-flex flex-row items-center px-3 py-1 font-semibold rounded-full gap-x-1 ${styles}`}>
      {status === 'active' ? (
        <>
          Active
          <TiTick className='w-4 h-4' />
        </>
      ) : status === 'deleted' ? (
        <>
          Deleted
          <IoMdClose className='w-4 h-4' />
        </>
      ) : (
        <>
          Inactive
          <AiOutlineExclamationCircle className='w-4 h-4' />
        </>
      )}
    </span>
  );
}

export { StoreStatus };
