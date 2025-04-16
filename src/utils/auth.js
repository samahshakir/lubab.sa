// auth.js - Place this file in your frontend src/utils folder
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;;

// Configure axios with authentication header
export const authAxios = () => {
  const token = localStorage.getItem("authToken");
  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return !!token && user?.id;
};

// Verify token is still valid
export const verifyToken = async () => {
  try {
    const response = await authAxios().get("/auth/verify");
    return response.data.user;
  } catch (error) {
    logout();
    return null;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};
