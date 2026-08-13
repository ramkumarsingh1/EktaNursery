import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const createOrder = (orderData) =>
    API.post("/orders", orderData);

export const getMyOrders = () =>
    API.get("/orders/my-orders");

export const getOrderById = (orderId) =>
    API.get(`/orders/${orderId}`);

export const cancelOrder = (orderId) =>
    API.patch(`/orders/${orderId}/cancel`);

export const createRazorpayOrder = (amount) =>
    API.post("/orders/payment/create", {
        amount,
    });

export const verifyRazorpayPayment = (paymentData) =>
    API.post("/orders/payment/verify", paymentData);

export const getAllOrders = () =>
    API.get("/orders/admin/all");

export const updateOrderStatus = (orderId,status) =>
    API.patch(
        `/orders/admin/${orderId}/status`,
        { status }
    );