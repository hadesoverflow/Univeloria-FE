import { apiClient } from './apiClient';

export const authApi = {
  login: async (emailOrPhone, password) => {
    return await apiClient('/api/Auth/login', {
      method: 'POST',
      data: { emailOrPhone, password },
    });
  },
  googleLogin: async (googleData) => {
    return await apiClient('/api/Auth/google-login', {
      method: 'POST',
      data: googleData,
    });
  },
  register: async (registerData) => {
    return await apiClient('/api/Auth/register', {
      method: 'POST',
      data: registerData,
    });
  },
  getMe: async () => {
    return await apiClient('/api/Auth/me', {
      method: 'GET',
    });
  },
  changePassword: async (currentPassword, newPassword, confirmNewPassword) => {
    return await apiClient('/api/Auth/change-password', {
      method: 'POST',
      data: { currentPassword, newPassword, confirmNewPassword },
    });
  },
};
