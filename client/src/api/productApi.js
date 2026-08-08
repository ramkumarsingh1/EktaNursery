import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const getAllProducts = ({
    page = 1,
    limit = 8,
    category,
    search,
    sort = "newest",
} = {}) =>
    API.get("/products", {
        params: {
            page,
            limit,
            ...(category && category !== "All" && { category }),
            ...(search && { search }),
            ...(sort && { sort }),
        },
    });

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