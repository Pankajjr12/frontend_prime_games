import axios from 'axios';

export const URL = "https://prime-game-store-backend.onrender.com";
// change api

export const api = axios.create({
  baseURL: URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});