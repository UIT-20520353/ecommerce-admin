import { handleAxios, instance } from './instance';

// USER AND AUTHENTICATION RESOURCE

async function login(email, password, code) {
  return handleAxios(
    instance.post('login', {
      email,
      password,
      mfaCode: code
    })
  );
}

async function logout() {
  return handleAxios(instance.post('users/logout'));
}

async function registerAccount(data) {
  return handleAxios(
    instance.post('register', {
      ...data
    })
  );
}

async function confirmAccount(code) {
  return handleAxios(
    instance.put('register/confirm', null, {
      params: {
        code
      }
    })
  );
}

async function setupMFA() {
  return handleAxios(instance.patch('users/mfa/setup'));
}

async function confirmMFACode(code) {
  return handleAxios(
    instance.post('users/mfa/confirm', {
      mfaCode: code
    })
  );
}

// SHOP PORTAL RESOURCE

const getShops = async (page, limit, search = '', property = 'id', type = 'asc') => {
  return handleAxios(
    instance.get('shops', {
      params: {
        size: limit,
        page,
        'name.contains': search,
        sort: `${property},${type}`
      }
    })
  );
};

const getAllShops = async () => {
  return handleAxios(instance.get('shops/all'));
};

const deleteShopById = async (id) => {
  return handleAxios(instance.delete(`shops/${id}`));
};

const bulkDeleteShops = async (ids) => {
  return handleAxios(
    instance.delete('shops/bulk', {
      data: {
        ids
      }
    })
  );
};

const getShopDetail = async () => {
  return handleAxios(instance.get('shops/me'));
};

const updateShopDetail = async (data) => {
  return handleAxios(
    instance.patch('shops/me', {
      ...data
    })
  );
};

const updateShopLogo = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return handleAxios(
    instance.patch('shops/me/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  );
};

// CUSTOMER PORTAL RESOURCE

const getCustomers = async (page, limit, search = '', property = 'id', type = 'asc') => {
  return handleAxios(
    instance.get('customers', {
      params: {
        size: limit,
        page,
        'name.contains': search,
        sort: `${property},${type}`
      }
    })
  );
};

// CATEGORY PORTAL RESOURCE

const getCategories = async (params) => {
  return handleAxios(instance.get('shops/me/categories', { params }));
};

const deleteCategoryById = async (id) => {
  return handleAxios(instance.delete(`shops/me/categories/${id}`));
};

const addNewCategory = async (name) => {
  return handleAxios(instance.post('shops/me/categories', { name }));
};

const bulkDeleteCategories = async (ids) => {
  return handleAxios(
    instance.delete('shops/me/categories/bulk', {
      data: {
        ids
      }
    })
  );
};

const getAllCategories = async () => {
  return handleAxios(instance.get('shops/me/categories/all'));
};

// TAG PORTAL RESOURCE

const getTags = async (params) => {
  return handleAxios(instance.get('shops/me/tags', { params }));
};

const deleteTagById = async (id) => {
  return handleAxios(instance.delete(`shops/me/tags/${id}`));
};

const addNewTag = async (name) => {
  return handleAxios(instance.post('shops/me/tags', { name }));
};

const bulkDeleteTags = async (ids) => {
  return handleAxios(
    instance.delete('shops/me/tags/bulk', {
      data: {
        ids
      }
    })
  );
};

const getAllTags = async () => {
  return handleAxios(instance.get('shops/me/tags/all'));
};

// EXPORT

export { login, logout, registerAccount, confirmAccount, setupMFA, confirmMFACode };
export { getShops, deleteShopById, getAllShops, bulkDeleteShops, getShopDetail, updateShopDetail, updateShopLogo };
export { getCustomers };
export { getCategories, deleteCategoryById, addNewCategory, bulkDeleteCategories, getAllCategories };
export { getTags, deleteTagById, addNewTag, bulkDeleteTags, getAllTags };
