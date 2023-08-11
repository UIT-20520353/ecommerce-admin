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

export { login, logout, registerAccount, confirmAccount, setupMFA, confirmMFACode };
export { getShops, deleteShopById, getAllShops, bulkDeleteShops };
