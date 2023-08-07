import { NavLink } from 'react-router-dom';
import { ModalPortal } from './ModalPortal';
import { AiTwotoneLock } from 'react-icons/ai';

const Notification = () => {
  return (
    <ModalPortal>
      <div className={'fixed left-0 top-0 z-40 h-screen w-full bg-black opacity-50'}></div>
      <div
        className={
          'fixed shadow-sm flex flex-col items-center left-1/2 top-1/2 z-50 max-h-[95%] w-1/3 -translate-x-1/2 -translate-y-1/2 gap-y-3 overflow-y-auto rounded-md bg-white p-5'
        }
      >
        <div className='flex flex-row items-center text-blue-600 gap-x-2'>
          <h2 className='text-3xl font-extrabold'>MFA</h2>
          <AiTwotoneLock className='w-8 h-8' />
        </div>
        <p className='text-gray-500'>Multi-factor authentication is required on your account</p>
        <NavLink
          to={'/mfa/setup'}
          className='block px-3 py-2 text-white duration-200 bg-green-600 rounded-md hover:bg-green-700'
        >
          Setup MFA and Access Your Account
        </NavLink>
      </div>
    </ModalPortal>
  );
};

export { Notification };
