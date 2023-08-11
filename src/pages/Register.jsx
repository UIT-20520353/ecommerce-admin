import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { registerAccount } from '../api/http';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { InputField } from '../components';

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

    if (response.ok) {
      reset();
      setIsSuccess(true);
    } else {
      toast(response.error.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000, type: 'error' });
    }
  };

  const inputFields = [
    {
      id: 'full-name',
      labelText: 'Name',
      errors: errors['name'],
      placeholder: 'Name',
      register: register('name', registerOptions.name)
    },
    {
      id: 'email',
      labelText: 'Email address',
      errors: errors['email'],
      placeholder: 'name@example.com',
      register: register('email', registerOptions.email)
    },
    {
      id: 'phone',
      labelText: 'Phone',
      errors: errors['phone'],
      placeholder: '03918xxxxx',
      register: register('phone', registerOptions.phone)
    }
  ];
  const passwordFields = [
    {
      id: 'password',
      labelText: 'Password',
      type: 'password',
      errors: errors['password'],
      placeholder: 'Password',
      width: 'w-full',
      register: register('password', registerOptions.password)
    },
    {
      id: 'comfirm-password',
      labelText: 'Confirm Password',
      type: 'password',
      errors: errors['confirmPassword'],
      placeholder: 'Confirm Password',
      width: 'w-full',
      register: register('confirmPassword', registerOptions.confirmPassword)
    }
  ];

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
            {inputFields.map((inputField) => (
              <InputField key={`input-field-${inputField.id}`} {...inputField} />
            ))}
            <div className='grid w-1/4 grid-cols-2 mb-4 gap-x-4'>
              {passwordFields.map((passwordField) => (
                <InputField key={`input-field-${passwordField.id}`} {...passwordField} />
              ))}
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
