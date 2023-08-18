import { useSelector } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { tagsPerPage } from '../constraint/constraint';
import { bulkDeleteTags, deleteTagById, getAllTags, getTags } from '../api/http';
import { TableHeader, TableComponent } from '../components';
import { toast } from 'react-toastify';
import { AddTag } from '../components/AddTag';

const Tags = () => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTag, setTotalTag] = useState(0);
  const [headerSort, setHeaderSort] = useState({ property: 'id', type: 'asc' });

  const fetchData = async () => {
    const params = {
      size: tagsPerPage,
      page: currentPage - 1,
      'name.contains': searchValue,
      sort: `${headerSort.property},${headerSort.type}`
    };

    const response = await getTags(params);
    if (response.ok) {
      setData(response.body);
      setTotalTag(response.totalCount);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchValue, headerSort]);

  const pages = useMemo(() => {
    return Math.ceil(totalTag / tagsPerPage);
  }, [totalTag]);

  const onSubmit = (data) => {
    setSearchValue(data.text);
    setCurrentPage(1);
  };

  const handleBulkDeleteCategory = async () => {
    const response = await bulkDeleteTags(selectedRows);
    if (response.ok) {
      toast('Xóa tag thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'success',
        autoClose: 3000
      });
      setSelectedRows([]);
      fetchData();
    } else {
      toast('Xảy ra lỗi khi xóa tag!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
        autoClose: 4000
      });
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

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteTag = async (id) => {
    const response = await deleteTagById(id);
    if (response.ok) {
      toast('Xóa tag thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'success',
        autoClose: 3000
      });
      fetchData();
    } else {
      toast('Xảy ra lỗi khi xóa tag!', {
        position: toast.POSITION.TOP_RIGHT,
        type: 'error',
        autoClose: 4000
      });
    }
  };

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAllSelection = async () => {
    if (selectedRows.length === totalTag) {
      setSelectedRows([]);
    } else {
      const response = await getAllTags();
      if (response.ok) {
        const allIds = response.body.map((row) => row.id);
        setSelectedRows(allIds);
      }
    }
  };

  const handleCloseForm = () => {
    setIsAdd(false);
    fetchData();
  };

  const handleOpenForm = () => {
    setIsAdd(true);
  };

  const selectObject = {
    checked: selectedRows.length === totalTag && data.length !== 0,
    toggleAllSelection,
    toggleRowSelection,
    checkSelected: (id) => selectedRows.includes(id)
  };

  const deleteObject = {
    byId: handleDeleteTag
  };

  const paginationObject = {
    currentPage,
    totalItems: totalTag,
    pages,
    handleChangePage
  };

  return (
    <main className={`w-30 my-16 duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
      <h1 className='mx-12 mt-24 mb-6 text-2xl font-bold'>Tags</h1>
      <TableHeader
        onSubmit={onSubmit}
        btnAdd={{ text: 'Add tag', handleClick: handleOpenForm }}
        bulkDelete={{ selectedRows, handleClick: handleBulkDeleteCategory }}
        placeHolder={'Search Tag'}
      />
      <TableComponent
        data={data}
        selectObject={selectObject}
        deleteObject={deleteObject}
        paginationObject={paginationObject}
        sort={headerSort}
        handleSort={handleSort}
      />

      {isAdd && <AddTag closeForm={handleCloseForm} />}
    </main>
  );
};

export default Tags;
