import axios from 'axios';

export const API_URL = "https://prime-game-store-backend.onrender.com";
// change api

export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});