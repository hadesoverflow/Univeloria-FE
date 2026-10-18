// API Base URL for backend services: uses env variable, or default production URL in prod, or empty string in dev (proxied by Vite)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.PROD ? 'https://api.univeloria.com' : '');

export const USER_ROLES = {
  ADMIN: 'Admin',
  CUSTOMER: 'Customer',
};

export const STORAGE_KEYS = {
  TOKEN: 'univeloria_token',
  USER: 'univeloria_user',
};
