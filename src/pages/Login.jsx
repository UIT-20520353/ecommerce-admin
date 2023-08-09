import { BiSolidUser, BiSolidKey } from 'react-icons/bi';
import { MdApps } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../api/http';
import { toast } from 'react-toastify';
import { setSession } from '../utils/utils';
import { Notification } from '../components';
import { useState } from 'react';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await login(data.email, data.password, data.code);
    if (response.type === 'success') {
      setSession(response.data);
      navigate('/', { replace: true });

      toast('Đăng nhập thành công', {
        position: 'top-right',
        type: 'success'
      });
    } else if (response.type === 'error') {
      toast(response.data, {
        position: 'top-right',
        autoClose: 5000,
        type: 'error'
      });
    } else {
      setSession(response.data);
      setShowNotification(true);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <img className='w-14 h-14' src={'https://prium.github.io/phoenix/v1.13.0/assets/img/icons/logo.png'} />
      <div className='flex flex-col items-center gap-1 mt-5'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <p className='text-base font-normal text-gray-500'>Get access to your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full mt-4'>
        <div className='w-1/4 mb-6'>
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
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className='absolute text-xs text-red-500'>{errors.email.message}</span>}
          </div>
        </div>
        <div className='w-1/4 mb-6'>
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
              autoComplete='off'
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className='absolute text-xs text-red-500'>{errors.password.message}</span>}
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
              autoComplete='off'
              {...register('code')}
            />
            {errors.code && <span className='absolute text-xs text-red-500'>{errors.code.message}</span>}
          </div>
        </div>
        <div className='flex flex-col items-center w-1/4 gap-4 mt-8'>
          <button
            type='submit'
            className='w-full py-2 text-sm font-medium text-white duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-[0.99]'
          >
            Sign In
          </button>
          <NavLink to={'/portal/register'} className='text-sm font-medium text-blue-500 hover:underline'>
            Create an account
          </NavLink>
        </div>
      </form>

      {showNotification && <Notification />}
    </div>
  );
};

export default Login;
