"use client";

import { createSlice } from '@reduxjs/toolkit';

// Define a helper function to safely get data from localStorage/sessionStorage
const getSavedAuthState = () => {
  if (typeof window !== "undefined") {
    const savedAuthState = localStorage.getItem('authState') || sessionStorage.getItem('authState');
    return savedAuthState ? JSON.parse(savedAuthState) : null;
  }
  return null;
};

// Initialize state
const initialState = getSavedAuthState() || {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Save state to localStorage and sessionStorage
      if (typeof window !== "undefined") {
        localStorage.setItem('authState', JSON.stringify(state));
        sessionStorage.setItem('authState', JSON.stringify(state));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Remove state from localStorage and sessionStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem('authState');
        sessionStorage.removeItem('authState');
      }
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout, loginFailure } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;

