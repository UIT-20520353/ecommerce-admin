import PropTypes from 'prop-types';
import { ModalPortal } from './ModalPortal';
import { InputField } from './InputField';
import { useForm } from 'react-hook-form';
import { addNewCategory } from '../api/http';
import { toast } from 'react-toastify';

const AddCategory = ({ closeForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const registerOptions = {
    name: { required: 'Name is required' }
  };

  const inputField = {
    id: 'new-name',
    labelText: 'Category name',
    errors: errors['name'],
    placeholder: 'Category name',
    register: register('name', registerOptions.name),
    width: 'w-full'
  };

  const onSubmit = async (data) => {
    const response = await addNewCategory(data.name);
    if (response.ok) {
      toast('Thêm category thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'success',
        autoClose: 3000
      });
      closeForm();
    } else {
      toast('Xảy ra lỗi khi thêm category!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
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
        <p className='text-base font-medium'>Add new category</p>
        <div className='w-full'>
          <InputField {...inputField} />
        </div>
        <div className='flex flex-row items-center justify-end w-full gap-x-3'>
          <button type='submit' className='px-4 py-2 text-sm text-white bg-blue-500 rounded-md shadow'>
            Save
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

AddCategory.propTypes = {
  closeForm: PropTypes.func.isRequired
};

export { AddCategory };
