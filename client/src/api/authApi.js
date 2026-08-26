import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Never refresh the refresh-token request itself
    if (originalRequest.url?.includes("/auth/refresh-token")) {
      return Promise.reject(error);
    }

    // Don't retry the same request again and again
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If another request is already refreshing the token,
    // wait for that refresh to finish.
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        return API(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      // Refresh token is stored in HttpOnly cookie.
      // Browser sends it automatically because withCredentials=true.
      await API.post("/auth/refresh-token");

      processQueue(null);

      // Retry original request with the new access token cookie
      return API(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export const registerUser = (userData) =>
  API.post("/auth/register", userData);

export const verifyEmail = (email, otp) =>
  API.post("/auth/verify-email", {
    email,
    otp,
  });

export const loginUser = (userData) =>
  API.post("/auth/login", userData);

export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", {
    email,
  });

export const verifyResetOTP = (email, otp) =>
  API.post("/auth/verify-reset-otp", {
    email,
    otp,
  });

export const resetPassword = (email, otp, newPassword) =>
  API.post("/auth/reset-password", {
    email,
    otp,
    newPassword,
  });

export const logoutUser = () =>
  API.post("/auth/logout");

export const getCurrentUser = () =>
  API.get("/auth/me");

export const refreshAccessToken = () =>
  API.post("/auth/refresh-token");

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

// Admin
export const getAllUsers = () =>
  API.get("/user/admin/all");

export default API;