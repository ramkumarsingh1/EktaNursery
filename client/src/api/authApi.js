import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const registerUser = (userData) =>
  API.post("/auth/register", userData);

export const loginUser = (userData) =>
  API.post("/auth/login", userData);

export const logoutUser = () =>
  API.post("/auth/logout");

export const getCurrentUser = () =>
  API.get("/auth/me");

export const refreshAccessToken = (refreshToken) =>
  API.post("/auth/refresh-token", {
    refreshToken,
  });

  export const updateProfile = (userData) =>
  API.put("/user/profile", userData);

export const changePassword = (passwordData) =>
  API.put("/user/change-password", passwordData);

export const updateAvatar = (formData) =>
  API.put("/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });