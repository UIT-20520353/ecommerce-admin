import { instance } from './instance';

// USER AND AUTHENTICATION RESOURCE

async function login(email, password, code) {
  const response = await instance.post('login', {
    email,
    password,
    mfaCode: code
  });

  return response;
}

async function logout() {
  return await instance.post('users/logout');
}

async function registerAccount(data) {
  const response = await instance.post('register', {
    ...data
  });

  return response;
}

async function confirmAccount(code) {
  return await instance.put('register/confirm', null, {
    params: {
      code
    }
  });
}

async function setupMFA() {
  const response = await instance.patch('users/mfa/setup');
  return response;
}

async function confirmMFACode(code) {
  const response = await instance.post('users/mfa/confirm', {
    mfaCode: code
  });

  return response;
}

// SHOP PORTAL RESOURCE

const getShops = async (page, limit, search = '', property = 'id', type = 'asc') => {
  const response = await instance.get('shops', {
    params: {
      size: limit,
      page,
      'name.contains': search,
      sort: `${property},${type}`
    }
  });

  return response;
};

const getAllShops = async () => {
  const response = await instance.get('shops/all');

  return response;
};

const deleteShopById = async (id) => {
  return await instance.delete(`shops/${id}`);
};

const bulkDeleteShops = async (ids) => {
  return await instance.delete('shops/bulk', {
    data: {
      ids
    }
  });
};

export { login, logout, registerAccount, confirmAccount, setupMFA, confirmMFACode };
export { getShops, deleteShopById, getAllShops, bulkDeleteShops };
