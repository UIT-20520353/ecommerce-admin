import PropTypes from 'prop-types';
import { FaSort } from 'react-icons/fa';
import { Pagination, SortIcon } from '../components';
import { categoriesPerPage } from '../constraint/constraint';
import { useEffect, useState } from 'react';

const TableComponent = ({ data, selectObject, deleteObject, paginationObject, sort, handleSort }) => {
  const [editingRow, setEditingRow] = useState(null);
  useEffect(() => {
    setEditingRow(null);
  }, [paginationObject.totalItems]);

  return (
    <div className='px-10 overflow-x-auto bg-white border-t border-b my-7'>
      <table className='w-full bg-white'>
        <thead className='text-sm font-medium text-left uppercase border-b'>
          <tr>
            <th className='px-4 py-3 text-left'>
              <input type='checkbox' checked={selectObject.checked} onChange={selectObject.toggleAllSelection} />
            </th>
            <th className='w-40 px-4 py-3 text-left cursor-pointer' onClick={() => handleSort('id')}>
              <div className='flex flex-row items-center gap-x-1'>
                Id
                {sort.property !== 'id' ? <FaSort className='w-3 h-3 text-gray-400' /> : <SortIcon type={sort.type} />}
              </div>
            </th>
            <th className='w-full px-4 py-3 text-left cursor-pointer' onClick={() => handleSort('name')}>
              <div className='flex flex-row items-center gap-x-1'>
                Name
                {sort.property !== 'name' ? (
                  <FaSort className='w-3 h-3 text-gray-400' />
                ) : (
                  <SortIcon type={sort.type} />
                )}
              </div>
            </th>
            <th className='px-4 py-3 text-left w-58'>Action</th>
          </tr>
        </thead>
        <tbody className='text-sm text-left text-gray-500'>
          {data.map((category) => (
            <tr key={`row-${category.id}`} className='border-b'>
              <td className='px-4 py-3 text-left'>
                <input
                  type='checkbox'
                  checked={selectObject.checkSelected(category.id)}
                  onChange={() => selectObject.toggleRowSelection(category.id)}
                />
              </td>
              <td className='w-40 px-4 py-3 font-semibold text-blue-500'>#{category.id}</td>
              <td className='w-full px-4 py-3 font-medium text-black'>
                <span className={`${editingRow === category.id && 'hidden'}`}>{category.name}</span>
                <form className={`${editingRow === category.id ? 'inline-block' : 'hidden'} w-1/3`}>
                  <input id='edit-name' className={'border border-gray-600 px-3 py-2 w-full rounded'} type='text' />
                </form>
              </td>
              <td className='px-4 py-3 w-58'>
                <div
                  className={`${
                    editingRow === category.id ? 'hidden' : 'flex'
                  } flex-row items-center text-sm font-medium gap-x-3`}
                >
                  <button className='text-blue-500 hover:underline' onClick={() => setEditingRow(category.id)}>
                    Edit
                  </button>
                  <button className='text-red-500 hover:underline' onClick={() => deleteObject.byId(category.id)}>
                    Delete
                  </button>
                </div>
                <button
                  className={`text-blue-500 hover:underline text-sm font-medium ${
                    editingRow === category.id ? 'inline-block' : 'hidden'
                  }`}
                  onClick={() => setEditingRow(null)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={paginationObject.currentPage}
        itemPerPage={categoriesPerPage}
        totalItems={paginationObject.totalItems}
        pages={paginationObject.pages}
        handleChangePage={paginationObject.handleChangePage}
      />
    </div>
  );
};

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  selectObject: PropTypes.object.isRequired,
  deleteObject: PropTypes.object.isRequired,
  paginationObject: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  handleSort: PropTypes.func.isRequired
};

export { TableComponent };
