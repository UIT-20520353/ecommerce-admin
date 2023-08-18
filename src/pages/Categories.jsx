import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { bulkDeleteCategories, deleteCategoryById, getAllCategories, getCategories } from '../api/http';
import { TableComponent } from '../components/TableComponent';
import { AddCategory, TableHeader } from '../components';
import { toast } from 'react-toastify';
import { categoriesPerPage } from '../constraint/constraint';

const Categories = () => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategory, setTotalCategory] = useState(0);
  const [headerSort, setHeaderSort] = useState({ property: 'id', type: 'asc' });

  const fetchData = async () => {
    const params = {
      size: categoriesPerPage,
      page: currentPage - 1,
      'name.contains': searchValue,
      sort: `${headerSort.property},${headerSort.type}`
    };

    const response = await getCategories(params);
    if (response.ok) {
      setData(response.body);
      setTotalCategory(response.totalCount);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchValue, headerSort]);

  const pages = useMemo(() => {
    return Math.ceil(totalCategory / categoriesPerPage);
  }, [totalCategory]);

  const onSubmit = (data) => {
    setSearchValue(data.text);
    setCurrentPage(1);
  };

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAllSelection = async () => {
    if (selectedRows.length === totalCategory) {
      setSelectedRows([]);
    } else {
      const response = await getAllCategories();
      if (response.ok) {
        const allIds = response.body.map((row) => row.id);
        setSelectedRows(allIds);
      }
    }
  };

  const handleSort = (property) => {
    if (property !== headerSort.property)
      setHeaderSort({
        property,
        type: 'asc'
      });
    else if (headerSort.type === 'asc')
      setHeaderSort({
        property,
        type: 'desc'
      });
    else
      setHeaderSort({
        property,
        type: 'asc'
      });
  };

  const handleOpenForm = () => {
    setIsAdd(true);
  };

  const handleCloseForm = () => {
    setIsAdd(false);
    fetchData();
  };

  const handleDeleteCategory = async (id) => {
    const response = await deleteCategoryById(id);
    if (response.ok) {
      toast('Xóa category thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'success',
        autoClose: 3000
      });
      fetchData();
    } else {
      toast('Xảy ra lỗi khi xóa category!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
        autoClose: 4000
      });
    }
  };

  const handleBulkDeleteCategory = async () => {
    const response = await bulkDeleteCategories(selectedRows);
    if (response.ok) {
      toast('Xóa category thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'success',
        autoClose: 3000
      });
      setSelectedRows([]);
      fetchData();
    } else {
      toast('Xảy ra lỗi khi xóa category!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
        autoClose: 4000
      });
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const selectObject = {
    checked: selectedRows.length === totalCategory && data.length !== 0,
    toggleAllSelection,
    toggleRowSelection,
    checkSelected: (id) => selectedRows.includes(id)
  };

  const deleteObject = {
    byId: handleDeleteCategory
  };

  const paginationObject = {
    currentPage,
    totalItems: totalCategory,
    pages,
    handleChangePage
  };

  return (
    <main className={`w-30 my-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-6 text-2xl font-bold'>Categories</h1>
      <TableHeader
        onSubmit={onSubmit}
        btnAdd={{ text: 'Add category', handleClick: handleOpenForm }}
        bulkDelete={{ selectedRows, handleClick: handleBulkDeleteCategory }}
        placeHolder={'Search categories'}
      />
      <TableComponent
        data={data}
        selectObject={selectObject}
        deleteObject={deleteObject}
        paginationObject={paginationObject}
        sort={headerSort}
        handleSort={handleSort}
      />

      {isAdd && <AddCategory closeForm={handleCloseForm} />}
    </main>
  );
};

export default Categories;
