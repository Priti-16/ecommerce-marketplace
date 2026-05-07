import axios from "axios";

const API = axios.create({
  baseURL: "http://https://ecommerce-marketplace-bcog.onrender.com/api:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;