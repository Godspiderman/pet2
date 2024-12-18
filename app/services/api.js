"use client";

import axios from 'axios';

// Axios instance with default base URL and headers
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await api.get("/api/public/category/getAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    throw new Error("Failed to fetch categories.");
  }
};

// Function to fetch all subcategories
export const fetchSubCategories = async () => {
  try {
    const response = await api.get("/api/public/subCategory/getAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error.response?.data || error.message);
    throw new Error("Failed to fetch subcategories.");
  }
};

// Function to get one user by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/api/public/user/getOne/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error.response?.data || error.message);
    throw error;
  }
};

// Function to update a user by ID
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/api/public/user/update/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.response?.data || error.message);
    throw error;
  }
};
