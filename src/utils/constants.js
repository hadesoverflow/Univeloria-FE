// API Base URL:
// Để chuỗi rỗng ('') giúp tất cả request /api đi qua proxy (Vite proxy ở dev, Vercel rewrites ở prod),
// tránh triệt để lỗi CORS giữa https://www.univeloria.com và https://api.univeloria.com.
// Có thể ghi đè bằng VITE_API_BASE_URL khi Backend đã cho phép CORS domain production.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const USER_ROLES = {
  ADMIN: 'Admin',
  CUSTOMER: 'Customer',
};

export const STORAGE_KEYS = {
  TOKEN: 'univeloria_token',
  USER: 'univeloria_user',
};
