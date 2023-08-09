import { KEY_STORAGE } from '../constraint/constraint';

export const getSession = () => {
  try {
    const value = window.sessionStorage.getItem(KEY_STORAGE);
    if (value) {
      return JSON.parse(value);
    } else {
      window.sessionStorage.setItem(KEY_STORAGE, JSON.stringify(null));
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setSession = (value) => {
  try {
    window.sessionStorage.setItem(KEY_STORAGE, JSON.stringify(value));
  } catch (error) {
    console.error('setSession: ', error);
  }
};
