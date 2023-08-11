import axios from 'axios';
import { getSession, setSession } from '../utils/utils';
import {
  ACCESS_DENIED,
  INVALID_CREDENTIAL,
  MFA_INVALID,
  USER_ALREADY_EXIST,
  USER_BLOCKED
} from '../constraint/constraint';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/portal/'
});

const refreshAccessToken = async () => {
  const response = await instance.post('refresh-tokens');
  if (response.ok) setSession(response.body);

  return response;
};

instance.interceptors.request.use(async (config) => {
  const session = getSession();
  switch (config?.url) {
    case 'login':
    case 'register/confirm':
    case 'register':
      break;
    case 'refresh-tokens': {
      config.headers['x-user-refresh-token'] = session?.refreshToken;
      break;
    }
    default: {
      config.headers['X-User-Access-Token'] = session?.accessToken;
      break;
    }
  }

  return config;
});

// suggestions object return

// {
//   status: number;
//   ok: boolean;
//   body?: T;
//   pagination?: Pagination;
//   error?: HttpError;
// }

instance.interceptors.response.use(
  (response) => {
    const { status, data: responseData, headers } = response;

    const data = {
      status,
      ok: true,
      body: responseData,
      ...(headers['x-total-count'] && { totalCount: +headers['x-total-count'] })
    };

    return data;
  },
  async (error) => {
    const { status, headers, config, data: responseData } = error.response;

    if (headers['x-is-token-expired'] && !config?.sent) {
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

    const response = {
      ok: false,
      error: {
        unauthorized: status === 401,
        badRequest: status === 400,
        notFound: status === 404,
        clientError: status >= 400 && status <= 499,
        serverError: status >= 500 && status <= 599,
        message: getMessage(responseData.detail)
      }
    };

    return Promise.reject(response);
  }
);

export const handleAxios = (apiRequest) => {
  return apiRequest.then((response) => response).catch((response) => response);
};

const getMessage = (detail) => {
  switch (detail) {
    case INVALID_CREDENTIAL:
      return 'Thông tin đăng nhập không chính xác';
    case USER_BLOCKED:
      return 'Bạn đã đăng nhập không thành công quá 5 lần, vui lòng chờ 30 phút để thử lại';
    case USER_ALREADY_EXIST:
      return 'Tài khoản đã được đăng ký';
    case MFA_INVALID:
      return 'Invalid code';
    case ACCESS_DENIED:
      return 'Access Denied';
    default:
      return '';
  }
};
