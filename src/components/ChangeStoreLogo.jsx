import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { ModalPortal } from './ModalPortal';
import { updateShopLogo } from '../api/http';
import { toast } from 'react-toastify';

const ChangeStoreLogo = ({ closeForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const response = await updateShopLogo(data.file[0]);
    if (response.ok) {
      toast('Cập nhật logo thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'success',
        autoClose: 3000
      });
      closeForm();
    } else {
      toast('Xảy ra lỗi khi cập nhật logo!', {
        type: 'error',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000
      });
    }
  };

  return (
    <ModalPortal>
      <div className={'fixed left-0 top-0 z-[500] h-screen w-full bg-black opacity-50'}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          'fixed shadow-sm flex flex-col items-center left-1/2 top-1/2 z-[501] max-h-[95%] w-1/4 -translate-x-1/2 -translate-y-1/2 gap-y-3 overflow-y-auto rounded-md bg-white p-5'
        }
      >
        <p className='text-base font-bold'>Change your store logo</p>
        <div className='flex flex-col items-start space-y-2'>
          <input
            type='file'
            accept='.jpg, .png'
            id='avatar'
            name='avatar'
            multiple={false}
            className='text-sm text-gray-500'
            {...register('file', { required: 'Please choose your image' })}
          />
          {errors.file && <span className='text-sm text-red-500'>{errors.file.message}</span>}
        </div>
        <div className='flex flex-row items-center justify-end w-full gap-x-3'>
          <button type='submit' className='px-4 py-2 text-sm text-white bg-blue-500 rounded-md shadow'>
            Update
          </button>
          <button
            type='button'
            onClick={closeForm}
            className='px-4 py-2 text-sm text-white bg-red-500 rounded-md shadow'
          >
            Close
          </button>
        </div>
      </form>
    </ModalPortal>
  );
};

ChangeStoreLogo.propTypes = {
  closeForm: PropTypes.func.isRequired
};

export { ChangeStoreLogo };
