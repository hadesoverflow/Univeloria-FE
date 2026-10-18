import { API_BASE_URL } from '../utils/constants';
import { storageService } from '../services/storageService';

export async function apiClient(endpoint, { method = 'GET', data = null, headers = {} } = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = storageService.getToken();

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const res = await fetch(url, config);
  const contentType = res.headers.get('content-type') || '';
  let resData = null;
  if (contentType.includes('application/json')) {
    resData = await res.json();
  } else {
    resData = await res.text();
  }

  if (!res.ok) {
    let errorMsg = resData?.message || `Lỗi HTTP! Trạng thái: ${res.status}`;
    if (resData?.errors && Array.isArray(resData.errors) && resData.errors.length > 0) {
      errorMsg = `${errorMsg}: ${resData.errors.join(', ')}`;
    }
    const error = new Error(errorMsg);
    error.status = res.status;
    error.data = resData;
    throw error;
  }

  return resData;
}
