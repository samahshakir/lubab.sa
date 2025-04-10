// auth.js - Place this file in your frontend src/utils folder
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Configure axios with authentication header
export const authAxios = () => {
  const token = localStorage.getItem('authToken');
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return !!token && !!user.id && user.isAdmin === true;
};

// Verify token is still valid
export const verifyToken = async () => {
  try {
    const response = await authAxios().get('/auth/verify');
    return response.data.user;
  } catch (error) {
    // Token is invalid or expired
    logout();
    return null;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/auth'; // Redirect to login page
};
