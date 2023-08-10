import { BiSolidUser, BiSolidKey } from 'react-icons/bi';
import { MdApps } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../api/http';
import { toast } from 'react-toastify';
import { setSession } from '../utils/utils';
import { InputField, Notification } from '../components';
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

    if (response.OK) {
      if (response.data.mfaAuthenticated) {
        setSession(response.data);
        navigate('/', { replace: true });

        toast('Đăng nhập thành công', {
          position: 'top-right',
          type: 'success'
        });
      } else {
        setSession(response.data);
        setShowNotification(true);
      }
    } else {
      toast(response.data, {
        position: 'top-right',
        autoClose: 5000,
        type: 'error'
      });
    }
  };

  const inputFields = [
    {
      id: 'email',
      labelText: 'Email address',
      errors: errors['email'],
      placeholder: 'name@example.com',
      icon: <BiSolidUser />,
      register: { ...register('email', { required: 'Email is required' }) }
    },
    {
      id: 'password',
      labelText: 'Password',
      type: 'password',
      errors: errors['password'],
      placeholder: 'Password',
      icon: <BiSolidKey />,
      register: register('password', { required: 'Password is required' })
    },
    {
      id: 'mfa-code',
      labelText: 'MFA Code',
      errors: errors['code'],
      placeholder: 'Enter the 6-digit MFA Code',
      icon: <MdApps />,
      register: register('code'),
      autoComplete: 'off'
    }
  ];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <img className='w-14 h-14' src={'https://prium.github.io/phoenix/v1.13.0/assets/img/icons/logo.png'} />
      <div className='flex flex-col items-center gap-1 mt-5'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <p className='text-base font-normal text-gray-500'>Get access to your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full mt-4'>
        {inputFields.map((inputField) => (
          <InputField key={`input-field-${inputField.id}`} {...inputField} />
        ))}
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
