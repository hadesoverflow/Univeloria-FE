import React, { createContext, useState, useEffect, useContext } from 'react';
import { storageService } from '../services/storageService';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storageService.getUser());
  const [token, setToken] = useState(() => storageService.getToken());
  const [loading, setLoading] = useState(false);

  const login = async (emailOrPhone, password) => {
    setLoading(true);
    try {
      const result = await authService.login(emailOrPhone, password);
      setUser(result.user);
      setToken(result.token);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (googleData) => {
    setLoading(true);
    try {
      const result = await authService.googleLogin(googleData);
      setUser(result.user);
      setToken(result.token);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const result = await authService.register(formData);
      setUser(result.user);
      setToken(result.token);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    isAdmin: user?.role === 'Admin',
    isCustomer: user?.role === 'Customer',
    login,
    loginWithGoogle,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
