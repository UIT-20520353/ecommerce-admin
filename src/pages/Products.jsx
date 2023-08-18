import { useSelector } from 'react-redux';

const Products = () => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  return (
    <main className={`w-30 my-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-6 text-2xl font-bold'>Products</h1>
    </main>
  );
};

export default Products;
