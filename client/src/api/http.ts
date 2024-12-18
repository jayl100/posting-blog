import axios = require('axios');

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const appClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});




