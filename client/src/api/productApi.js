import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

export const getAllProducts = () => API.get("/products");

export const createProduct = (formData) =>
    API.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    export const updateProduct = (id, formData) =>
    API.put(`/products/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteProduct = (id) =>
    API.delete(`/products/${id}`);

export const getProductById = (id) =>
    API.get(`/products/${id}`);