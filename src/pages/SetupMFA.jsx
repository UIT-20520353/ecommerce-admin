import { useEffect, useState } from 'react';
import { setupMFA } from '../api/http';
import { toast } from 'react-toastify';
import { ConfirmMFA } from '../components';

const SetupMFA = () => {
  const [data, setData] = useState({ img: '', key: '' });
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await setupMFA();

    if (response.OK) {
      setData({ img: response.data.qrCodeURL, key: response.data.secret });
    } else {
      toast(response.data, {
        position: 'top-right',
        autoClose: 5000,
        type: 'error'
      });
    }
  };

  const handleClose = () => {
    setIsConfirm(false);
  };

  const handleOpen = () => {
    setIsConfirm(true);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-y-4'>
      <h3 className='text-lg font-medium'>
        Scan the QR code with google authenticator or put the key in google authenticator app
      </h3>
      <img src={data.img} />
      <p className='text-sm'>Key: {data.key}</p>
      <button
        className='px-4 py-2 text-sm text-white duration-200 bg-blue-600 rounded-md hover:bg-blue-700'
        onClick={handleOpen}
      >
        Next
      </button>

      {isConfirm && <ConfirmMFA handleClose={handleClose} />}
    </div>
  );
};

export default SetupMFA;
