import { CgPushLeft } from 'react-icons/cg';
import { BsArrowBarRight } from 'react-icons/bs';
import { LuStore } from 'react-icons/lu';
import { AiOutlineUser, AiOutlineLogout, AiOutlineShop, AiOutlineTag } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiProductHuntLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { collapse, expand } from '../app/toggleSidebarSlice';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getSession, setSession } from '../utils/utils';
import { useMemo } from 'react';
import { logout } from '../api/http';
import { MenuItem } from './MenuItem';

const Sidebar = () => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = getSession();

  const role = useMemo(() => {
    const temp = jwtDecode(session?.accessToken || null);
    return temp?.authorities[0];
  }, [session?.accessToken]);

  const handleSignOut = async () => {
    await logout();
    setSession(null);
    navigate('/login', { replace: true });
  };

  const ADMIN_MENUS = [
    {
      text: 'Store management',
      icon: <LuStore className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />,
      isCollapsed: isCollapsed,
      url: '/'
    },
    {
      text: 'Customer management',
      icon: <AiOutlineUser className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />,
      isCollapsed: isCollapsed,
      url: '/customers'
    }
  ];

  const SHOP_MENUS = [
    {
      text: 'Store detail',
      icon: <AiOutlineShop className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />,
      isCollapsed: isCollapsed,
      url: '/'
    },
    {
      text: 'Category management',
      icon: <BiCategoryAlt className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />,
      isCollapsed: isCollapsed,
      url: '/categories'
    },
    {
      text: 'Tag management',
      icon: <AiOutlineTag className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />,
      isCollapsed: isCollapsed,
      url: '/tags'
    },
    {
      text: 'Product management',
      icon: <RiProductHuntLine className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />,
      isCollapsed: isCollapsed,
      url: '/products'
    }
  ];

  return (
    <aside
      className={`fixed border-gray-200 left-0 bg-white border-r top-16 duration-200 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <ul className='flex flex-col items-start px-4 mt-4 gap-y-3 h-sidebar custom-scroll'>
        {role === 'ADMIN' ? (
          <>
            {ADMIN_MENUS.map((item) => (
              <MenuItem key={`Admin-${item.url}`} {...item} />
            ))}
          </>
        ) : (
          <>
            {SHOP_MENUS.map((item) => (
              <MenuItem key={`Shop-${item.url}`} {...item} />
            ))}
          </>
        )}
        <li className='w-full'>
          <button
            className={`flex flex-row w-full py-3 duration-200 rounded-lg items-enter gap-x-4 hover:bg-gray-200 ${
              isCollapsed ? 'justify-center px-2 w-9 h-9' : 'px-4'
            } text-gray-600`}
            onClick={handleSignOut}
          >
            <AiOutlineLogout className={`${isCollapsed ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <p className={`text-sm opacity-100 ${isCollapsed && 'hidden opacity-0'}`}>Sign out</p>
          </button>
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
};

export { Sidebar };
