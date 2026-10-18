import { apiClient } from './apiClient';

export const reviewApi = {
  getProductReviews: async (productId) => {
    return await apiClient(`/api/Products/${productId}/reviews`);
  },

  checkCanReview: async (productId) => {
    return await apiClient(`/api/Products/${productId}/can-review`);
  },

  submitProductReview: async (productId, reviewData) => {
    return await apiClient(`/api/Products/${productId}/reviews`, {
      method: 'POST',
      data: reviewData,
    });
  },
};
