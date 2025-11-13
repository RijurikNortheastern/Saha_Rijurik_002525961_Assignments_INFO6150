import axios from 'axios';

// Change this URL to match your Node.js backend from Assignment 8
const API_URL = 'http://localhost:5000/api'; // Update this with your actual backend URL

const authService = {
  login: async (username, password) => {
    try {
      // For now, we'll simulate a successful login
      // Replace this with actual API call to your backend
      
      // Uncomment this when connecting to your backend:
      // const response = await axios.post(`${API_URL}/auth/login`, {
      //   username,
      //   password
      // });
      // return response.data;

      // Mock response for development
      if (username && password) {
        const mockResponse = {
          success: true,
          token: 'mock-jwt-token',
          user: { username, id: Date.now() }
        };
        return mockResponse;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;