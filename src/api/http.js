import { instance } from './instance';

// USER AND AUTHENTICATION RESOURCE

async function login(email, password, code) {
  try {
    const response = await instance.post('login', {
      email,
      password,
      mfaCode: code
    });

    if (response.data.mfaAuthenticated) return { type: 'success', data: response.data };
    else {
      return {
        type: 'mfa',
        data: response.data
      };
    }
  } catch (error) {
    if (error.response?.data?.detail === 'error.validate.user.blocked')
      return { type: 'error', data: 'Bạn đã đăng nhập không thành công quá 5 lần, vui lòng chờ 30 phút để thử lại' };
    else if (error.response?.status === 401) return { type: 'error', data: 'Thông tin đăng nhập không chính xác' };
    else return { type: 'error', data: 'Server error' };
  }
}

async function logout(accessToken) {
  try {
    await instance.post('users/logout', null, {
      headers: {
        'X-User-Access-Token': accessToken
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function registerAccount(data) {
  try {
    await instance.post('register', {
      ...data
    });

    return {
      type: 'success',
      data: 'Đăng ký tài khoản thành công'
    };
  } catch (error) {
    const detail = error.response.data.detail;
    if (detail === 'error.validate.user.already-exist')
      return {
        type: 'error',
        data: 'Tài khoản đã được đăng ký'
      };

    return {
      type: 'error',
      data: 'Lỗi server'
    };
  }
}

async function confirmAccount(code) {
  try {
    await instance.put('register/confirm', null, {
      params: {
        code
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function setupMFA(token) {
  try {
    const response = await instance.patch('users/mfa/setup', null, {
      headers: {
        'X-User-Access-Token': token
      }
    });

    return {
      type: 'success',
      data: response.data
    };
  } catch (error) {
    return {
      type: 'error',
      data: 'An error occurred while performing setup MFA'
    };
  }
}

async function confirmMFACode(code, token) {
  try {
    const response = await instance.post(
      'users/mfa/confirm',
      {
        mfaCode: code
      },
      {
        headers: {
          'X-User-Access-Token': token
        }
      }
    );

    return {
      type: 'success',
      data: response.data
    };
  } catch (error) {
    return {
      type: 'error',
      data: 'Invalid code'
    };
  }
}

// SHOP PORTAL RESOURCE

const getShops = async (token, page, limit, search = '', property = 'id', type = 'asc') => {
  try {
    const response = await instance.get('shops', {
      headers: {
        'X-User-Access-Token': token
      },
      params: {
        size: limit,
        page,
        'name.contains': search,
        sort: `${property},${type}`
      }
    });

    return {
      type: 'success',
      data: response.data,
      totalCount: +response.headers['x-total-count']
    };
  } catch (error) {
    return {
      type: 'error',
      data: [],
      totalCount: 0
    };
  }
};

const getAllShops = async (token) => {
  try {
    const response = await instance.get('shops/all', {
      headers: {
        'X-User-Access-Token': token
      }
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteShopById = async (token, id) => {
  try {
    await instance.delete(`shops/${id}`, {
      headers: {
        'X-User-Access-Token': token
      }
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const bulkDeleteShops = async (token, ids) => {
  try {
    await instance.delete('shops/bulk', {
      data: {
        ids
      },
      headers: {
        'X-User-Access-Token': token
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export { login, logout, registerAccount, confirmAccount, setupMFA, confirmMFACode };
export { getShops, deleteShopById, getAllShops, bulkDeleteShops };
