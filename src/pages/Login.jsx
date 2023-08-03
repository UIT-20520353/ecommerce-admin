import { BiSolidUser, BiSolidKey } from 'react-icons/bi';
import { MdApps } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <img className='w-14 h-14' src={'https://prium.github.io/phoenix/v1.13.0/assets/img/icons/logo.png'} />
      <div className='flex flex-col items-center gap-1 mt-5'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <p className='text-base font-normal text-gray-500'>Get access to your account</p>
      </div>
      <form className='flex flex-col items-center w-full mt-4'>
        <div className='w-1/4 mb-5'>
          <label htmlFor='email' className='block mb-2 ml-4 text-xs font-medium text-gray-900 uppercase'>
            Email address
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
              <BiSolidUser />
            </div>
            <input
              type='text'
              id='email'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5'
              placeholder='name@example.com'
            />
          </div>
        </div>
        <div className='w-1/4 mb-5'>
          <label htmlFor='password' className='block mb-2 ml-4 text-xs font-medium text-gray-900 uppercase'>
            Password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
              <BiSolidKey />
            </div>
            <input
              type='password'
              id='password'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5'
              placeholder='Password'
            />
          </div>
        </div>
        <div className='w-1/4 mb-5'>
          <label htmlFor='mfa-code' className='block mb-2 ml-4 text-xs font-medium text-gray-900 uppercase'>
            MFA Code
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
              <MdApps />
            </div>
            <input
              type='text'
              id='mfa-code'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5'
              placeholder='Enter the 6-digit MFA Code'
            />
          </div>
        </div>
        <div className='flex items-center w-1/4 mb-4'>
          <input
            id='default-checkbox'
            type='checkbox'
            value=''
            className='w-4 h-4 text-blue-600 bg-white border-gray-300 rounded'
          />
          <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900'>
            Remember me
          </label>
        </div>
        <div className='flex flex-col items-center w-1/4 gap-4 mt-8'>
          <button
            type='submit'
            className='w-full py-2 text-sm font-medium text-white duration-200 bg-blue-500 rounded-lg hover:bg-blue-600'
          >
            Sign In
          </button>
          <NavLink to={'/register'} className='text-sm font-medium text-blue-500 hover:underline'>
            Create an account
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
