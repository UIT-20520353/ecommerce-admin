import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { registerAccount } from '../api/http';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();
  const [isSucess, setIsSuccess] = useState(false);

  const registerOptions = {
    name: { required: 'Name is required' },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
        message: 'Incorrect email format'
      }
    },
    password: {
      required: 'Password is required',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'Incorrect password format'
      }
    },
    phone: {
      required: 'Phone is required',
      pattern: {
        value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        message: 'Incorrect phone format'
      }
    },
    confirmPassword: {
      required: 'Confirm password is required',
      validate: (val) => {
        if (watch('password') != val) {
          return 'Your passwords do no match';
        }
      }
    }
  };

  const onSubmit = async (data) => {
    const response = await registerAccount({
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone
    });

    if (response.type === 'success') {
      reset();
      setIsSuccess(true);
    } else {
      toast(response.data, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000, type: response.type });
    }
  };

  return (
    <>
      {isSucess ? (
        <div className='flex flex-col items-center justify-center min-h-screen space-y-3 bg-gray-100'>
          <h2 className='text-4xl font-bold'>You have signed up successfully!</h2>
          <p className='text-lg text-gray-500'>Please check your email to verify your account.</p>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
          <img className='w-14 h-14' src={'https://prium.github.io/phoenix/v1.13.0/assets/img/icons/logo.png'} />
          <div className='flex flex-col items-center gap-1 mt-5'>
            <h1 className='text-2xl font-bold'>Sign Up</h1>
            <p className='text-base font-normal text-gray-500'>Create your account today</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full mt-4'>
            <div className='relative w-1/4 mb-6'>
              <label htmlFor='full-name' className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'>
                Name
              </label>
              <input
                type='text'
                id='full-name'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 px-5'
                placeholder='Name'
                {...register('name', registerOptions.name)}
              />
              {errors.name && <span className='absolute text-xs text-red-500 left-4'>{errors.name.message}</span>}
            </div>
            <div className='relative w-1/4 mb-6'>
              <label htmlFor='email' className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'>
                Email address
              </label>
              <input
                type='text'
                id='email'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 p-2.5'
                placeholder='name@example.com'
                {...register('email', registerOptions.email)}
              />
              {errors.email && <span className='absolute text-xs text-red-500 left-4'>{errors.email.message}</span>}
            </div>
            <div className='relative w-1/4 mb-6'>
              <label htmlFor='phone' className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'>
                Phone
              </label>
              <input
                id='phone'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 p-2.5'
                placeholder='03918xxxxx'
                {...register('phone', registerOptions.phone)}
              />
              {errors.phone && <span className='absolute text-xs text-red-500 left-4'>{errors.phone.message}</span>}
            </div>
            <div className='grid w-1/4 grid-cols-2 mb-6 gap-x-4'>
              <div className='relative'>
                <label htmlFor='password' className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 p-2.5'
                  placeholder='Password'
                  {...register('password', registerOptions.password)}
                />
                {errors.password && (
                  <span className='absolute text-xs text-red-500 left-4'>{errors.password.message}</span>
                )}
              </div>
              <div className='relative'>
                <label
                  htmlFor='comfirm-password'
                  className='block mb-2 ml-5 text-xs font-medium text-gray-900 uppercase'
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='comfirm-password'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-5 p-2.5'
                  placeholder='Confirm Password'
                  {...register('confirmPassword', registerOptions.confirmPassword)}
                />
                {errors.confirmPassword && (
                  <span className='absolute text-xs text-red-500 left-4'>{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>
            <div className='flex items-center w-1/4 mb-4'>
              <p className='ml-2 text-sm font-medium text-gray-900'>
                By clicking Sign Up, you agree to our{' '}
                <span className='text-blue-500 cursor-pointer hover:underline'>terms</span> and{' '}
                <span className='text-blue-500 cursor-pointer hover:underline'>privacy policy</span>
              </p>
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
      )}
    </>
  );
};

export default Register;
