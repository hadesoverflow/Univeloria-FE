import { STORAGE_KEYS } from '../utils/constants';

export const storageService = {
  getToken: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch {
      return null;
    }
  },
  setToken: (token) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch {}
  },
  removeToken: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch {}
  },
  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {}
  },
  removeUser: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {}
  },
  clearAuth: () => {
    storageService.removeToken();
    storageService.removeUser();
  }
};
