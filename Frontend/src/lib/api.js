import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const request = async (path, options = {}) => {
  try {
    const token = localStorage.getItem("auth-token");
    const response = await client.request({
      url: path,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      ...options,
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
    throw new Error(message, { cause: error });
  }
};

export const signUp = (data) =>
  request("/auth/signup", { method: "POST", data });

export const signIn = (data) =>
  request("/auth/signin", { method: "POST", data });

export const getCurrentUser = () => request("/auth/me");

export const getTasks = () => request("/tasks");

export const createTask = (title) =>
  request("/tasks", {
    method: "POST",
    data: { title },
  });

export const toggleTask = (id) =>
  request(`/tasks/${id}/toggle`, {
    method: "PATCH",
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, {
    method: "DELETE",
  });