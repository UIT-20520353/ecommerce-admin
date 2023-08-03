import { CgPushLeft } from 'react-icons/cg';
import { BsArrowBarRight } from 'react-icons/bs';
import { LuStore } from 'react-icons/lu';
import { AiOutlineUser } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { collapse, expand } from '../app/toggleSidebarSlice';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const dispatch = useDispatch();

  return (
    <aside
      className={`fixed border-gray-200 left-0 bg-white border-r top-16 duration-200 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <ul className='flex flex-col items-start px-4 mt-4 gap-y-3 h-sidebar custom-scroll'>
        <li className='w-full'>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `flex flex-row w-full py-3 duration-200 rounded-lg items-enter gap-x-4 hover:bg-gray-200 ${
                isCollapsed ? 'justify-center px-2 w-9 h-9' : 'px-4'
              } ${isActive ? 'text-blue-500' : 'text-gray-600'}`
            }
          >
            <LuStore className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <p className={`text-sm opacity-100 ${isCollapsed && 'hidden opacity-0'}`}>Store management</p>
          </NavLink>
        </li>
        <li className='w-full'>
          <NavLink
            to={'/customers'}
            className={({ isActive }) =>
              `flex flex-row w-full py-3 duration-200 rounded-lg items-enter gap-x-4 hover:bg-gray-200 ${
                isCollapsed ? 'justify-center px-2 w-9 h-9' : 'px-4'
              } ${isActive ? 'text-blue-500' : 'text-gray-600'}`
            }
          >
            <AiOutlineUser className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <p className={`text-sm opacity-100 ${isCollapsed && 'hidden opacity-0'}`}>Customer management</p>
          </NavLink>
        </li>
      </ul>
      <div
        className={`sticky bottom-0 left-0 w-full h-16 bg-white z-[999] border-t flex items-center ${
          isCollapsed ? 'justify-center' : 'justify-start'
        }`}
      >
        <button
          className={`flex flex-row items-center gap-x-3 ${!isCollapsed && 'ml-6'}`}
          onClick={() => (isCollapsed ? dispatch(expand()) : dispatch(collapse()))}
        >
          {isCollapsed ? (
            <BsArrowBarRight className='w-4 h-4 text-gray-600' />
          ) : (
            <CgPushLeft className='w-4 h-4 text-gray-600' />
          )}
          <span
            className={`text-xs font-medium text-gray-600 opacity-100 duration-100 ${
              isCollapsed && 'hidden opacity-0'
            }`}
          >
            Collapsed View
          </span>
        </button>
      </div>
    </aside>
  );
}

export { Sidebar };
