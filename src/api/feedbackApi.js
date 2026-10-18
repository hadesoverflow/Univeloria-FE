import { apiClient } from './apiClient';

export const feedbackApi = {
  submitFeedback: async (feedbackData) => {
    return await apiClient('/api/Feedback', {
      method: 'POST',
      data: feedbackData
    });
  }
};
