import { useSelector } from 'react-redux';
import { TableHeader, SortIcon, Pagination } from '../components';
import { useEffect, useState, useMemo } from 'react';
import { FaSort } from 'react-icons/fa';
import { getAllProducts, getProducts } from '../api/http';
import { productsPerPage } from '../constraint/constraint';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sort, setSort] = useState({ property: 'id', type: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    const params = {
      size: productsPerPage,
      page: currentPage - 1,
      'title.contains': searchValue,
      sort: `${sort.property},${sort.type}`
    };

    const response = await getProducts(params);

    if (response.ok) {
      setProducts(response.body);
      setTotalProduct(response.totalCount);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchValue, sort]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const pages = useMemo(() => {
    return Math.ceil(totalProduct / productsPerPage);
  }, [totalProduct]);

  const onSubmit = (data) => {
    setSearchValue(data.text);
    setCurrentPage(1);
  };

  const handleSort = (property) => {
    if (property !== sort.property)
      setSort({
        property,
        type: 'asc'
      });
    else if (sort.type === 'asc')
      setSort({
        property,
        type: 'desc'
      });
    else
      setSort({
        property,
        type: 'asc'
      });
  };

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAllSelection = async () => {
    if (selectedRows.length === totalProduct) {
      setSelectedRows([]);
    } else {
      const response = await getAllProducts();
      if (response.ok) {
        const allIds = response.body.map((row) => row.id);
        setSelectedRows(allIds);
      }
    }
  };

  return (
    <main className={`w-30 my-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-6 text-2xl font-bold'>Products</h1>
      <TableHeader
        onSubmit={onSubmit}
        btnAdd={{
          text: 'Add product',
          handleClick: () => {
            navigate('/add-product');
          }
        }}
        bulkDelete={{ selectedRows, handleClick: () => {} }}
        placeHolder={'Search Product'}
      />
      <div className='px-10 overflow-x-auto bg-white border-t border-b my-7'>
        <table className='w-full bg-white'>
          <thead className='text-sm font-medium text-left uppercase border-b'>
            <tr>
              <th className='w-5 py-3 text-left'>
                <input
                  type='checkbox'
                  onChange={toggleAllSelection}
                  checked={selectedRows.length === totalProduct && products.length !== 0}
                />
              </th>
              <th className='w-20 px-4 py-3 text-left'>Image</th>
              <th className='px-4 py-3 text-left cursor-pointer w-72' onClick={() => handleSort('title')}>
                <div className='flex flex-row items-center gap-x-1'>
                  Product Name
                  {sort.property !== 'id' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={sort.type} />
                  )}
                </div>
              </th>
              <th className='px-4 py-3 text-left w-28'>Category</th>
              <th className='w-40 px-4 py-3 text-left'>Tags</th>
              <th className='px-4 py-3 text-left cursor-pointer w-28' onClick={() => handleSort('salePrice')}>
                <div className='flex flex-row items-center gap-x-1'>
                  Sale Price
                  {sort.property !== 'salePrice' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={sort.type} />
                  )}
                </div>
              </th>
              <th className='px-4 py-3 text-left cursor-pointer w-28' onClick={() => handleSort('regularPrice')}>
                <div className='flex flex-row items-center gap-x-1'>
                  Regular Price
                  {sort.property !== 'regularPrice' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={sort.type} />
                  )}
                </div>
              </th>
              <th className='px-4 py-3 text-left cursor-pointer w-28' onClick={() => handleSort('stock')}>
                <div className='flex flex-row items-center gap-x-1'>
                  Stock
                  {sort.property !== 'stock' ? (
                    <FaSort className='w-3 h-3 text-gray-400' />
                  ) : (
                    <SortIcon type={sort.type} />
                  )}
                </div>
              </th>
              <th className='px-4 py-3 text-left w-28'>Action</th>
            </tr>
          </thead>
          <tbody className='text-sm text-left text-gray-500'>
            {products.map((product) => (
              <tr key={`product-${product.id}`} className='border-b'>
                <td className='w-5 py-3 text-left'>
                  <input
                    type='checkbox'
                    onChange={() => toggleRowSelection(product.id)}
                    checked={selectedRows.includes(product.id)}
                  />
                </td>
                <td className='w-20 px-4 py-3'>
                  <img className='w-12 h-12 border rounded' src={product.images[0]} />
                </td>
                <td className='px-4 py-3 font-normal text-black w-72'>
                  <p className='line-clamp-3'>{product.title}</p>
                </td>
                <td className='px-4 py-3 font-normal text-gray-500 w-28'>{product.category.name}</td>
                <td className='w-40 py-3 font-medium text-black'>
                  <ul className='flex flex-row flex-wrap items-center gap-2'>
                    {product.tags.map((tag) => (
                      <li className='inline-block px-2 py-1 text-xs bg-gray-200 rounded' key={`tag-${tag.id}`}>
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className='px-4 py-3 font-normal text-center text-gray-500 w-28'>{product.salePrice}$</td>
                <td className='px-4 py-3 font-normal text-center text-gray-500 w-28'>{product.regularPrice}$</td>
                <td className='px-4 py-3 font-normal text-center text-gray-500 w-28'>{product.stock}</td>
                <td className='px-4 py-3 font-normal'>
                  <div className='flex flex-row items-center gap-x-2'>
                    <button className='w-20 px-4 py-2 font-medium text-white duration-200 bg-blue-500 rounded-md shadow hover:bg-blue-600'>
                      Edit
                    </button>
                    <button className='w-20 px-4 py-2 font-medium text-white duration-200 bg-red-500 rounded-md shadow hover:bg-red-600'>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          itemPerPage={productsPerPage}
          totalItems={totalProduct}
          pages={pages}
          handleChangePage={handleChangePage}
        />
      </div>
    </main>
  );
};

export default Products;
