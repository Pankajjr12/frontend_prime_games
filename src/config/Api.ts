import axios from "axios";

export const API_URL = "https://backend-prime-games.onrender.com";
// export const API_URL = "http://localhost:4444";
export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});



