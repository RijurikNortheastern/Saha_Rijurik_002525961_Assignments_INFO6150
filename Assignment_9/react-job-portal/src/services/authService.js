import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
      
      return response.data;
      
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        throw new Error('Cannot connect to server. Make sure backend is running on port 5000');
      } else {
        throw new Error('An error occurred during login');
      }
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