import { NavLink } from 'react-router-dom';

function Register() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <img className='w-14 h-14' src={'https://prium.github.io/phoenix/v1.13.0/assets/img/icons/logo.png'} />
      <div className='flex flex-col items-center gap-1 mt-5'>
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        <p className='text-base font-normal text-gray-500'>Create your account today</p>
      </div>
      <form className='flex flex-col items-center w-full mt-4'>
        <div className='w-1/4 mb-5'>
          <label htmlFor='full-name' className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'>
            Name
          </label>
          <input
            type='text'
            id='full-name'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 px-5'
            placeholder='Name'
          />
        </div>
        <div className='w-1/4 mb-5'>
          <label htmlFor='email' className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'>
            Email address
          </label>
          <input
            type='text'
            id='email'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 p-2.5'
            placeholder='name@example.com'
          />
        </div>
        <div className='grid w-1/4 grid-cols-2 mb-5 gap-x-4'>
          <div>
            <label htmlFor='password' className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 p-2.5'
              placeholder='Password'
            />
          </div>
          <div>
            <label htmlFor='comfirm-password' className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'>
              Confirm Password
            </label>
            <input
              type='password'
              id='comfirm-password'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 p-2.5'
              placeholder='Confirm Password'
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
            I accept the <span className='text-blue-500 cursor-pointer hover:underline'>terms</span> and{' '}
            <span className='text-blue-500 cursor-pointer hover:underline'>privacy policy</span>
          </label>
        </div>
        <div className='flex flex-col items-center w-1/4 gap-4'>
          <button
            type='submit'
            className='w-full py-2 text-sm font-medium text-white duration-200 bg-blue-500 rounded-lg hover:bg-blue-600'
          >
            Sign Up
          </button>
          <NavLink to={'/login'} className='text-sm font-medium text-blue-500 hover:underline'>
            Sign in to an existing account
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;
