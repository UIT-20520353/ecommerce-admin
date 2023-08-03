import { MdOutlineLightMode } from 'react-icons/md';
import { FiBell } from 'react-icons/fi';
import { MdOutlineApps } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';

function Header() {
  return (
    <header
      className={
        'h-16 z-[999] w-full border-b border-gray-200 fixed left-0 top-0 pl-6 pr-10 flex flex-row items-center justify-between bg-white'
      }
    >
      <div className='flex flex-row items-center gap-x-3'>
        <img className='w-7 h-7' src={'https://prium.github.io/phoenix/v1.13.0/assets/img/icons/logo.png'} />
        <h3 className='text-2xl font-medium text-gray-500'>phoenix</h3>
      </div>
      <form className='flex items-center px-4 py-2 border rounded-full w-100 gap-x-3'>
        <AiOutlineSearch className='w-4 h-4' />
        <input
          type='search'
          id='search'
          className='w-full text-sm cursor-pointer focus:outline-none'
          placeholder='Search...'
        />
      </form>
      <ul className='flex flex-row items-center'>
        <li>
          <button className='flex items-center justify-center w-8 h-8 text-orange-700 duration-200 bg-orange-100 rounded-full hover:bg-orange-400 hover:text-white'>
            <MdOutlineLightMode className='w-4 h-4' />
          </button>
        </li>
        <li>
          <button className='flex items-center justify-center w-8 h-8 ml-2'>
            <FiBell />
          </button>
        </li>
        <li>
          <button className='flex items-center justify-center w-8 h-8 mr-2'>
            <MdOutlineApps />
          </button>
        </li>
        <li>
          <button className='rounded-full'>
            <img src={'/Avatar_4.png'} className='w-10 h-10 rounded-full' />
          </button>
        </li>
      </ul>
    </header>
  );
}

export { Header };
