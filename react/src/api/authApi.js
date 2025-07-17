import axios from 'axios';

// Base URL for API requests
const API_URL = '/';

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}api/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Server error' };
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Server error' };
  }
};

// Get current user data
export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Server error' };
  }
};