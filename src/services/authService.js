import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || 'https://taskflow-backend-8css.onrender.com'}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
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
 * Google authentication with backend verification
 */
export const authService = {
  googleAuth: async (googleToken) => {
    const response = await axiosInstance.post('/auth/google', {
      token: googleToken,
    });
    return response.data;
  },

  healthCheck: async () => {
    const response = await axios.get(`${API_URL.replace('/api', '')}/health`);
    return response.data;
  },
};
