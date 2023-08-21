import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { getAllCategories, getAllTags } from '../api/http';

const AddProduct = () => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const { register, handleSubmit, getValues } = useForm();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const fetchTags = await getAllTags();
    const fetchCategories = await getAllCategories();

    if (fetchTags.ok) {
      setTags(fetchTags.body);
      setCategories(fetchCategories.body);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const registerOptions = {
    title: { required: 'Title is required' },
    description: { required: 'Description is required' }
  };

  const handleAddTag = () => {
    const id = getValues('tag');

    if (id) {
      const selectedTag = tags.find((tag) => tag.id == id);
      const temp = tags.filter((tag) => tag.id != id);

      if (!selectedTag) return;

      setTags(temp);
      setSelectedTagList([...selectedTagList, selectedTag]);
    }
  };

  const handleRemoveTag = (id) => {
    const result = selectedTagList.find((tag) => tag.id == id);
    setSelectedTagList(selectedTagList.filter((tag) => tag.id != id));
    setTags([...tags, result]);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`w-30 my-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <div className='flex flex-row items-center justify-between mx-12 mt-24 mb-6'>
        <h1 className='text-2xl font-bold'>Add a product</h1>
        <button className='px-4 py-2 text-sm font-medium text-white duration-200 bg-blue-500 rounded-md hover:bg-blue-600'>
          Publish product
        </button>
      </div>
      <div className='flex flex-row items-start gap-10 mx-12 my-7'>
        <div className='w-[70%]'>
          <div className='flex flex-col w-full mb-6 gap-y-2'>
            <label htmlFor='title' className='text-base font-medium'>
              Product Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 px-5'
              placeholder='Write title here...'
              {...register('title', registerOptions.title)}
            />
          </div>
          <div className='flex flex-col w-full mb-6 gap-y-2'>
            <label htmlFor='description' className='text-base font-medium'>
              Product Description
            </label>
            <textarea
              id='description'
              name='description'
              className='bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 px-5'
              autoComplete='off'
              placeholder='Write a description here...'
              rows={10}
              {...register('description', registerOptions.description)}
            />
          </div>
          <div className='w-full'>
            <p className='text-base font-medium'>Display images</p>
          </div>
        </div>
        <div className='w-[30%] bg-white border rounded-md shadow-sm px-5 py-4'>
          <h3 className='text-lg font-medium'>Organize</h3>
          <div className='flex flex-col w-full mt-5 gap-y-2'>
            <label htmlFor='category' className='text-base font-medium'>
              Category
            </label>
            <select
              id='category'
              name='category'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-gray-500 focus:border-gray-500'
              disabled={!categories.length}
            >
              {categories.map((category) => (
                <option key={`category-option-${category.id}`}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col w-full mt-5 gap-y-2'>
            <label htmlFor='tag' className='text-base font-medium'>
              Tags
            </label>
            <select
              id='tag'
              name='tag'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-gray-500 focus:border-gray-500'
              disabled={!tags.length}
              {...register('tag')}
            >
              {tags.map((tag) => (
                <option key={`tag-option-${tag.id}`} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <ul className='w-full h-32 p-2 space-x-1 space-y-1 overflow-y-auto border rounded-lg'>
              {selectedTagList.map((tag) => (
                <li
                  className='inline-flex flex-row items-center px-2 py-1 text-xs font-medium bg-gray-200 rounded gap-x-1'
                  key={`tag-selected-${tag.id}`}
                >
                  {tag.name}
                  <button type='button' onClick={() => handleRemoveTag(tag.id)}>
                    <AiOutlineClose />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type='button'
              className='px-3 py-2 text-sm font-medium text-white duration-200 bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600'
              onClick={handleAddTag}
            >
              Add tag
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
