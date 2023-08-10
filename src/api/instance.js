import axios from 'axios';
import { getSession, setSession } from '../utils/utils';
import { INVALID_CREDENTIAL, USER_ALREADY_EXIST, USER_BLOCKED } from '../constraint/constraint';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/portal/'
});

const refreshAccessToken = async () => {
  const response = await instance.post('refresh-tokens');
  if (response.OK) setSession(response.data);
  else setSession(null);

  return response;
};

instance.interceptors.request.use((config) => {
  const session = getSession();

  if (config?.url === 'refresh-tokens') {
    config.headers['x-user-refresh-token'] = session?.refreshToken;
  } else if (config?.url !== 'login' && config?.url.includes('register') === false) {
    config.headers['X-User-Access-Token'] = session?.accessToken;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    const config = response?.config;

    switch (config.url) {
      case 'shops':
        return {
          OK: true,
          data: response.data,
          totalCount: +response.headers['x-total-count']
        };
      case 'login':
        return { OK: true, data: response.data };
      case 'shops/all':
        return {
          OK: true,
          data: response.data
        };
      case 'users/logout':
        return {
          OK: true,
          data: null
        };
      case 'register':
        return {
          OK: true,
          data: 'Đăng ký tài khoản thành công'
        };
      case 'refresh-tokens':
        return {
          OK: true,
          data: response.data
        };
      case 'users/mfa/setup':
        return {
          OK: true,
          data: response.data
        };
      case 'users/mfa/confirm':
        return {
          OK: true,
          data: response.data
        };
      default:
        return {
          OK: true,
          data: null
        };
    }
  },
  async (error) => {
    switch (error?.response?.data?.detail) {
      case INVALID_CREDENTIAL:
        return {
          OK: false,
          data: 'Thông tin đăng nhập không chính xác'
        };
      case USER_BLOCKED:
        return {
          OK: false,
          data: 'Bạn đã đăng nhập không thành công quá 5 lần, vui lòng chờ 30 phút để thử lại'
        };
      case USER_ALREADY_EXIST:
        return {
          OK: false,
          data: 'Tài khoản đã được đăng ký'
        };
    }

    const config = error?.config;
    const temp = getSession();

    if (error?.response?.status === 401 && !config?.sent && temp) {
      config.sent = true;

      const result = await refreshAccessToken();

      if (result.OK && result?.accessToken) {
        config.headers = {
          ...config.headers,
          'X-User-Access-Token': result.accessToken
        };
      }

      return instance(config);
    }

    switch (config?.url) {
      case 'users/mfa/setup':
        return {
          OK: false,
          data: 'An error occurred while performing setup MFA'
        };
      case 'users/mfa/confirm':
        return {
          OK: false,
          data: 'Invalid code'
        };
      case 'shops':
        return {
          OK: false,
          data: [],
          totalCount: 0
        };
      case 'shops/all':
        return {
          OK: false,
          data: []
        };
      case 'refresh-tokens':
        return {
          OK: false,
          data: null
        };
      default:
        return {
          OK: false,
          data: null
        };
    }
  }
);
