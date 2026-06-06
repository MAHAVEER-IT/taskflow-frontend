import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'https://taskflow-backend-8css.onrender.com'}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Chat service - interact with RAG assistant
 */
export const chatService = {
  /**
   * Send a question to the AI assistant
   */
  postChat: async (question) => {
    const response = await axiosInstance.post('/chat', {
      question,
    });
    return response.data.data;
  },

  /**
   * Get chat history for current user
   */
  getChatHistory: async (limit = 20, skip = 0) => {
    const response = await axiosInstance.get('/chat/history', {
      params: { limit, skip },
    });
    return {
      chats: response.data.data || [],
      pagination: response.data.pagination,
    };
  },
};
