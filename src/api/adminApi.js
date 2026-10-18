import { apiClient } from './apiClient';

export const adminApi = {
  // ==========================================
  // 1. DASHBOARD
  // ==========================================
  getDashboard: async () => {
    return await apiClient('/api/Admin/dashboard', { method: 'GET' });
  },

  // ==========================================
  // 2. USER MANAGEMENT
  // ==========================================
  getUsers: async (search = '', role = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (role && role !== 'ALL') params.append('role', role);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiClient(`/api/Admin/users${query}`, { method: 'GET' });
  },

  getUserById: async (id) => {
    return await apiClient(`/api/Admin/users/${id}`, { method: 'GET' });
  },

  createUser: async (data) => {
    return await apiClient('/api/Admin/users', { method: 'POST', data });
  },

  updateUser: async (id, data) => {
    return await apiClient(`/api/Admin/users/${id}`, { method: 'PUT', data });
  },

  toggleUserStatus: async (id) => {
    return await apiClient(`/api/Admin/users/${id}/toggle-status`, { method: 'PUT' });
  },

  changeUserRole: async (id, role) => {
    return await apiClient(`/api/Admin/users/${id}/role`, { method: 'PUT', data: { role } });
  },

  deleteUser: async (id) => {
    return await apiClient(`/api/Admin/users/${id}`, { method: 'DELETE' });
  },

  // ==========================================
  // 3. ORDER MANAGEMENT
  // ==========================================
  getOrders: async (statusType = '', search = '') => {
    const params = new URLSearchParams();
    if (statusType && statusType !== 'ALL') params.append('statusType', statusType);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiClient(`/api/Admin/orders${query}`, { method: 'GET' });
  },

  getOrderById: async (id) => {
    return await apiClient(`/api/Admin/orders/${id}`, { method: 'GET' });
  },

  createOrder: async (data) => {
    return await apiClient('/api/Admin/orders', { method: 'POST', data });
  },

  updateOrderStatus: async (id, status, statusType, notes = '') => {
    return await apiClient(`/api/Admin/orders/${id}/status`, {
      method: 'PUT',
      data: { status, statusType, notes }
    });
  },

  updateOrder: async (id, data) => {
    return await apiClient(`/api/Admin/orders/${id}`, { method: 'PUT', data });
  },

  updateOrderPayment: async (id, data) => {
    return await apiClient(`/api/Admin/orders/${id}/payment`, { method: 'PUT', data });
  },

  deleteOrder: async (id) => {
    return await apiClient(`/api/Admin/orders/${id}`, { method: 'DELETE' });
  },

  // ==========================================
  // 4. PRODUCT MANAGEMENT
  // ==========================================
  getProducts: async (searchOrFilters = '', category = '', room = '') => {
    let search = '';
    let cat = category;
    let rm = room;

    if (typeof searchOrFilters === 'object' && searchOrFilters !== null) {
      search = searchOrFilters.search || '';
      cat = searchOrFilters.category || '';
      rm = searchOrFilters.room || '';
    } else {
      search = searchOrFilters || '';
    }

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (cat && cat !== 'ALL') params.append('category', cat);
    if (rm && rm !== 'ALL') params.append('room', rm);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await apiClient(`/api/Admin/products${query}`, { method: 'GET' });
    return res?.data ?? res;
  },

  getProductById: async (id) => {
    const res = await apiClient(`/api/Admin/products/${id}`, { method: 'GET' });
    return res?.data ?? res;
  },

  createProduct: async (data) => {
    const res = await apiClient('/api/Admin/products', { method: 'POST', data });
    return res?.data ?? res;
  },

  updateProduct: async (id, data) => {
    const res = await apiClient(`/api/Admin/products/${id}`, { method: 'PUT', data });
    return res?.data ?? res;
  },

  deleteProduct: async (id) => {
    const res = await apiClient(`/api/Admin/products/${id}`, { method: 'DELETE' });
    return res?.data ?? res;
  },

  // ==========================================
  // 5. REVIEW MANAGEMENT
  // ==========================================
  getReviews: async (status = '', rating = null, search = '') => {
    const params = new URLSearchParams();
    if (status && status !== 'ALL') params.append('status', status);
    if (rating && rating !== 'ALL') params.append('rating', rating);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiClient(`/api/Admin/reviews${query}`, { method: 'GET' });
  },

  updateReviewStatus: async (id, status) => {
    return await apiClient(`/api/Admin/reviews/${id}/status`, {
      method: 'PUT',
      data: { status }
    });
  },

  replyReview: async (id, reply) => {
    return await apiClient(`/api/Admin/reviews/${id}/reply`, {
      method: 'PUT',
      data: { reply }
    });
  },

  deleteReview: async (id) => {
    return await apiClient(`/api/Admin/reviews/${id}`, { method: 'DELETE' });
  },

  // ==========================================
  // 6. CONSULTATION MANAGEMENT
  // ==========================================
  getConsultations: async (status = '', search = '') => {
    const params = new URLSearchParams();
    if (status && status !== 'ALL') params.append('status', status);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiClient(`/api/Admin/consultations${query}`, { method: 'GET' });
  },

  updateConsultationStatus: async (id, status) => {
    return await apiClient(`/api/Admin/consultations/${id}/status`, {
      method: 'PUT',
      data: { status }
    });
  },

  scheduleConsultation: async (id, scheduledDate, assignee, status = 'scheduled') => {
    return await apiClient(`/api/Admin/consultations/${id}/schedule`, {
      method: 'PUT',
      data: { scheduledDate, assignee, status }
    });
  },

  deleteConsultation: async (id) => {
    return await apiClient(`/api/Admin/consultations/${id}`, { method: 'DELETE' });
  },

  // ==========================================
  // 7. ACTIVITY LOGS
  // ==========================================
  getActivityLogs: async (take = 50) => {
    return await apiClient(`/api/Admin/activity-logs?take=${take}`, { method: 'GET' });
  },

  // ==========================================
  // 8. FEEDBACK MANAGEMENT
  // ==========================================
  getFeedbacks: async (status = '', category = '', search = '') => {
    const params = new URLSearchParams();
    if (status && status !== 'ALL') params.append('status', status);
    if (category && category !== 'ALL') params.append('category', category);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiClient(`/api/Feedback${query}`, { method: 'GET' });
  },

  getFeedbackById: async (id) => {
    return await apiClient(`/api/Feedback/${id}`, { method: 'GET' });
  },

  respondFeedback: async (id, adminResponse, status = 'resolved') => {
    return await apiClient(`/api/Feedback/${id}/respond`, {
      method: 'PUT',
      data: { adminResponse, status }
    });
  },

  deleteFeedback: async (id) => {
    return await apiClient(`/api/Feedback/${id}`, { method: 'DELETE' });
  }
};
