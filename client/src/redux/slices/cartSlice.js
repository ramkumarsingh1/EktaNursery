
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        addToCart(state, action) {
            const product = action.payload;

            const existingItem = state.items.find(
                (item) => item._id === product._id
            );

            const requestedQuantity = product.quantity || 1;

            if (existingItem) {
                const newQuantity =
                    existingItem.quantity + requestedQuantity;

                existingItem.quantity = Math.min(
                    newQuantity,
                    existingItem.stock
                );
            } else {
                const safeQuantity = Math.min(
                    requestedQuantity,
                    product.stock
                );

                state.items.push({
                    ...product,
                    quantity: safeQuantity,
                });
            }
        },

        removeFromCart(state, action) {
            state.items = state.items.filter(
                (item) => item._id !== action.payload
            );
        },

        increaseQuantity(state, action) {
            const item = state.items.find(
                (item) => item._id === action.payload
            );

            if (item && item.quantity < item.stock) {
                item.quantity++;
            }
        },

        decreaseQuantity(state, action) {
            const item = state.items.find(
                (item) => item._id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity--;
            }
        },

        clearCart(state) {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

