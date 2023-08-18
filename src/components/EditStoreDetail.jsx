import { useForm } from 'react-hook-form';
import { ModalPortal } from './ModalPortal';
import { InputField } from './InputField';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { updateShopDetail } from '../api/http';
import { toast } from 'react-toastify';

const EditStoreDetail = ({ closeForm, storeDetail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    setValue('name', storeDetail?.name || '');
    setValue('email', storeDetail?.email || '');
    setValue('phone', storeDetail?.phone || '');
  }, []);

  const onSubmit = async (data) => {
    const response = await updateShopDetail({ name: data.name, phone: data.phone });
    if (response.ok) {
      toast('Cập nhật thông tin thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'success',
        autoClose: 3000
      });
      closeForm();
    } else {
      toast('Xảy ra lỗi khi cập nhật thông tin!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
        autoClose: 4000
      });
    }
  };

  const registerOptions = {
    name: { required: 'Name is required' },
    phone: {
      required: 'Phone is required',
      pattern: {
        value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        message: 'Incorrect phone format'
      }
    }
  };

  const inputFields = [
    {
      id: 'full-name',
      labelText: 'Name',
      errors: errors['name'],
      placeholder: 'Name',
      register: register('name', registerOptions.name),
      width: 'w-full'
    },
    {
      id: 'phone',
      labelText: 'Phone',
      errors: errors['phone'],
      placeholder: '03918xxxxx',
      register: register('phone', registerOptions.phone),
      width: 'w-full'
    }
  ];

  return (
    <ModalPortal>
      <div className={'fixed left-0 top-0 z-[500] h-screen w-full bg-black opacity-50'}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          'fixed shadow-sm flex flex-col items-center left-1/2 top-1/2 z-[501] max-h-[95%] w-1/4 -translate-x-1/2 -translate-y-1/2 gap-y-3 overflow-y-auto rounded-md bg-white p-5'
        }
      >
        <p className='text-base font-medium'>Change your store profile</p>
        <div className='flex flex-col items-center w-full mt-4'>
          {inputFields.map((inputField) => (
            <InputField key={`input-field-${inputField.id}`} {...inputField} />
          ))}
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

EditStoreDetail.propTypes = {
  closeForm: PropTypes.func.isRequired,
  storeDetail: PropTypes.object.isRequired
};

export { EditStoreDetail };
