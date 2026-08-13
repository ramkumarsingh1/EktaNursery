import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const getDashboardStats = () =>
    API.get("/dashboard/stats");