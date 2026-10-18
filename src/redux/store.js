import { authReducer } from './authSlice';

// Central Redux store abstraction matching project architecture
export const store = {
  auth: authReducer,
};
