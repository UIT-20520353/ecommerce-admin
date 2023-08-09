import axios from 'axios';
import { getSession, setSession } from '../utils/utils';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/portal/'
});

const refreshAccessToken = async () => {
  const temp = getSession();

  return instance
    .post('refresh-tokens', null, {
      headers: {
        'x-user-refresh-token': temp.refreshToken
      }
    })
    .then((response) => {
      const newToken = response.data;
      setSession(newToken);
      return newToken;
    })
    .catch((error) => {
      setSession(null);
      return Promise.reject(error);
    });
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (
      error?.response?.status === 401 &&
      error?.respons?.data?.detail !== 'error.validate.login.invalid-credential' &&
      !config?.sent
    ) {
      const temp = getSession();
      if (!temp) return Promise.reject(error);

      config.sent = true;

      const result = await refreshAccessToken();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          'X-User-Access-Token': result.accessToken
        };
      }

      return instance(config);
    }

    return Promise.reject(error);
  }
);
