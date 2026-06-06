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
 * Ticket service - manage support tickets
 */
export const ticketService = {
  /**
   * Create a new support ticket
   */
  createTicket: async (question) => {
    const response = await axiosInstance.post('/tickets', {
      question,
    });
    return response.data.data;
  },

  /**
   * Get user's tickets
   */
  getUserTickets: async (limit = 20, skip = 0) => {
    const response = await axiosInstance.get('/tickets', {
      params: { limit, skip },
    });
    return {
      tickets: response.data.data || [],
      pagination: response.data.pagination,
    };
  },

  /**
   * Get all tickets for admins
   */
  getAllTickets: async (limit = 100, skip = 0) => {
    const response = await axiosInstance.get('/tickets/admin/all', {
      params: { limit, skip },
    });
    return {
      tickets: response.data.data || [],
      pagination: response.data.pagination,
    };
  },

  /**
   * Update ticket status
   */
  updateTicketStatus: async (ticketId, status) => {
    const response = await axiosInstance.patch(`/tickets/${ticketId}`, {
      status,
    });
    return response.data.data;
  },
};
