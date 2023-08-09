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
  const getStatus = useMemo(() => {
    switch (status) {
      case 'ACTIVE':
        return { styles: 'text-green-700 bg-green-200', icon: <TiTick className='w-4 h-4' />, text: 'Active' };
      case 'DELETED':
        return {
          styles: 'text-red-700 bg-red-200',
          icon: <IoMdClose className='w-4 h-4' />,
          text: 'Deleted'
        };
      case 'INACTIVE':
        return {
          styles: 'text-yellow-700 bg-yellow-100',
          icon: <AiOutlineExclamationCircle className='w-4 h-4' />,
          text: 'Inactived'
        };
      default:
        return '';
    }
  }, [status]);

  return (
    <span
      className={`inline-flex flex-row items-center px-3 py-1 font-semibold rounded-full gap-x-1 ${getStatus.styles}`}
    >
      <>
        {getStatus.text} {getStatus.icon}
      </>
    </span>
  );
}

export { StoreStatus };
