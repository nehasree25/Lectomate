import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/user/register/`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/user/login/`, userData);
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
