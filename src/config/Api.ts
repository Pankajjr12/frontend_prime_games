import axios from 'axios';

export const API_URL = "https://frontend-prime-games.vercel.app";
// export const DEPLOYED_URL = "https://frontend-prime-games.vercel.app"
// change api

export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});