import { authApi } from '../api/authApi';
import { storageService } from './storageService';

export const authService = {
  login: async (emailOrPhone, password) => {
    try {
      const res = await authApi.login(emailOrPhone, password);
      if (res && res.success && res.data) {
        storageService.setToken(res.data.token);
        storageService.setUser(res.data.user);
        return { success: true, user: res.data.user, token: res.data.token, message: res.message };
      }
      throw new Error(res?.message || 'Đăng nhập không thành công');
    } catch (err) {
      throw err;
    }
  },

  googleLogin: async (googleData) => {
    try {
      const res = await authApi.googleLogin(googleData);
      if (res && res.success && res.data) {
        storageService.setToken(res.data.token);
        storageService.setUser(res.data.user);
        return { success: true, user: res.data.user, token: res.data.token, message: res.message };
      }
      throw new Error(res?.message || 'Đăng nhập Google không thành công');
    } catch (err) {
      throw err;
    }
  },

  register: async (formData) => {
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword || formData.password,
      };

      const res = await authApi.register(payload);
      if (res && res.success && res.data) {
        storageService.setToken(res.data.token);
        storageService.setUser(res.data.user);
        return { success: true, user: res.data.user, token: res.data.token, message: res.message };
      }
      throw new Error(res?.message || 'Đăng ký không thành công');
    } catch (err) {
      throw err;
    }
  },

  logout: () => {
    storageService.clearAuth();
  },

  getCurrentUser: () => {
    return storageService.getUser();
  },

  isAuthenticated: () => {
    return Boolean(storageService.getToken());
  },
};
