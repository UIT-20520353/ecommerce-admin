import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ text, icon, isCollapsed, url }) => {
  return (
    <li className='w-full'>
      <NavLink
        to={url}
        className={({ isActive }) =>
          `flex flex-row w-full py-3 duration-200 rounded-lg items-enter gap-x-4 hover:bg-gray-200 ${
            isCollapsed ? 'justify-center px-2 w-9 h-9' : 'px-4'
          } ${isActive ? 'text-blue-500' : 'text-gray-600'}`
        }
      >
        {icon}
        <p className={`text-sm opacity-100 ${isCollapsed && 'hidden opacity-0'}`}>{text}</p>
      </NavLink>
    </li>
  );
};

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};

export { MenuItem };
