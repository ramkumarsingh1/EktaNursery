import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const createOrder = (orderData) =>
    API.post("/orders", orderData);

export const getMyOrders = () =>
    API.get("/orders/my-orders");