import { apiClient } from './apiClient';

export const customerApi = {
  // Lấy thông tin hồ sơ cá nhân
  getProfile: async () => {
    return await apiClient('/api/Customer/profile', {
      method: 'GET',
    });
  },

  // Cập nhật thông tin hồ sơ cá nhân
  updateProfile: async (data) => {
    return await apiClient('/api/Customer/profile', {
      method: 'PUT',
      data,
    });
  },

  // Lấy danh sách lịch sử đơn hàng
  getOrders: async () => {
    return await apiClient('/api/Customer/orders', {
      method: 'GET',
    });
  },

  // Tạo đơn hàng rèm may đo mới
  createOrder: async (data) => {
    return await apiClient('/api/Customer/orders', {
      method: 'POST',
      data,
    });
  },

  // Thanh toán cọc / toàn bộ đơn may đo
  payOrder: async (orderId, data) => {
    return await apiClient(`/api/Customer/orders/${orderId}/pay`, {
      method: 'POST',
      data,
    });
  },

  // Lấy danh sách sản phẩm rèm yêu thích
  getFavorites: async () => {
    return await apiClient('/api/Customer/favorites', {
      method: 'GET',
    });
  },

  // Thêm sản phẩm vào danh sách yêu thích
  addFavorite: async (productId) => {
    return await apiClient(`/api/Customer/favorites/${productId}`, {
      method: 'POST',
    });
  },

  // Xóa sản phẩm khỏi danh sách yêu thích
  removeFavorite: async (productId) => {
    return await apiClient(`/api/Customer/favorites/${productId}`, {
      method: 'DELETE',
    });
  },

  // ===== GIỎ HÀNG (DATABASE CART) =====
  // Lấy giỏ hàng từ server
  getCart: async () => {
    return await apiClient('/api/Customer/cart', {
      method: 'GET',
    });
  },

  // Thêm sản phẩm vào giỏ hàng DB
  addToCart: async (data) => {
    return await apiClient('/api/Customer/cart', {
      method: 'POST',
      data,
    });
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng DB
  updateCartItem: async (id, quantity) => {
    return await apiClient(`/api/Customer/cart/${id}`, {
      method: 'PUT',
      data: { quantity },
    });
  },

  // Xóa 1 sản phẩm khỏi giỏ hàng DB
  removeCartItem: async (id) => {
    return await apiClient(`/api/Customer/cart/${id}`, {
      method: 'DELETE',
    });
  },

  // Làm trống toàn bộ giỏ hàng DB
  clearCart: async () => {
    return await apiClient('/api/Customer/cart', {
      method: 'DELETE',
    });
  },

  // ===== THANH TOÁN TRỰC TUYẾN PAYOS =====
  // Tạo liên kết thanh toán PayOS (Cọc 50% hoặc 100% Free Ship)
  createPayOSPayment: async (data) => {
    return await apiClient('/api/PayOS/create-payment-link', {
      method: 'POST',
      data,
    });
  },

  // Kiểm tra trạng thái giao dịch PayOS
  getPayOSStatus: async (orderCode) => {
    return await apiClient(`/api/PayOS/payment-status/${orderCode}`, {
      method: 'GET',
    });
  },

  // Xác nhận thanh toán PayOS mô phỏng / hoàn tất
  confirmPayOSSimulation: async (orderCode, transactionCode) => {
    const url = transactionCode
      ? `/api/PayOS/confirm-simulation/${orderCode}?transactionCode=${encodeURIComponent(transactionCode)}`
      : `/api/PayOS/confirm-simulation/${orderCode}`;
    return await apiClient(url, {
      method: 'POST',
    });
  },
};
