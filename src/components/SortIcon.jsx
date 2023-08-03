import PropTypes from 'prop-types';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

SortIcon.propTypes = {
  type: PropTypes.string.isRequired
};

function SortIcon({ type }) {
  if (type === 'asc') return <FaSortUp className='w-3 h-3 text-gray-400' />;
  else return <FaSortDown className='w-3 h-3 text-gray-400' />;
}

export { SortIcon };
