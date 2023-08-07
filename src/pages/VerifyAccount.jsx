import { NavLink, useSearchParams } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import { useEffect } from 'react';
import { confirmAccount } from '../api/http';

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await confirmAccount(searchParams.get('code'));
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-3 bg-gray-100'>
      <div className='flex flex-col items-center w-1/3 gap-3 p-4 bg-white rounded-md shadow'>
        <TiTick className='w-12 h-12 text-white bg-blue-600 rounded-full' />
        <h2 className='text-3xl font-bold'>Verified!</h2>
        <p className='text-base text-gray-500'>You have successfully verified account.</p>
        <NavLink
          to={'/login'}
          className='block px-4 py-2 mt-2 text-white duration-200 bg-blue-600 rounded-md shadow hover:bg-blue-700'
        >
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default VerifyAccount;
