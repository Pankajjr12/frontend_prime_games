import axios from "axios";

export const API_URL = "https://backend-prime-games.onrender.com";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  if (config.method === "get" && config.url) { // Ensure config.url is defined
    const cachedData = sessionStorage.getItem(config.url);
    if (cachedData) {
      return Promise.resolve({
        ...config,
        data: JSON.parse(cachedData),
        status: 200,
        statusText: "OK (from cache)",
      });
    }
  }
  return config;
});


// Add a response interceptor for caching GET requests
