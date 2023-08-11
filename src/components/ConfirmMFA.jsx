import { useForm } from 'react-hook-form';
import { ModalPortal } from './ModalPortal';
import PropTypes from 'prop-types';
import { confirmMFACode } from '../api/http';
import { setSession } from '../utils/utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ConfirmMFA = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await confirmMFACode(data.code);

    if (response.ok) {
      setSession(null);
      toast('Setup MFA successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'success',
        autoClose: 3000
      });
      navigate('/login', { replace: true });
    } else {
      toast(response.error.message, {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
        autoClose: 5000
      });
    }
  };

  return (
    <ModalPortal>
      <div className={'fixed left-0 top-0 z-40 h-screen w-full bg-black opacity-50'}></div>
      <div
        className={
          'fixed shadow-sm flex flex-col items-center left-1/2 top-1/2 z-50 max-h-[95%] w-1/4 -translate-x-1/2 -translate-y-1/2 gap-y-3 overflow-y-auto rounded-md bg-white p-5'
        }
      >
        <p className='text-base font-medium'>Enter the generated code to active</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-y-3'>
          <div className='flex flex-col items-start gap-y-1'>
            <input
              autoComplete='off'
              type='text'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              placeholder='Enter the 6-digit MFA Code'
              {...register('code', { required: 'Code is required' })}
            />
            {errors.code && <span className='ml-2 text-sm text-red-500'>{errors.code.message}</span>}
          </div>
          <div className='flex flex-row items-center gap-x-3'>
            <button
              type='submit'
              className='px-4 py-2 text-sm text-white duration-200 bg-blue-600 rounded-md hover:bg-blue-700'
            >
              Next
            </button>
            <button
              type='button'
              className='px-4 py-2 text-sm text-white duration-200 bg-red-600 rounded-md hover:bg-red-700'
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </ModalPortal>
  );
};

ConfirmMFA.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export { ConfirmMFA };
