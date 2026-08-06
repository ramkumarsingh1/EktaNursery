import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },

        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        loginFailure: (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUser,
} = authSlice.actions;

export default authSlice.reducer;