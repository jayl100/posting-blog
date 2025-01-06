import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/';
      return;
    }
    return Promise.reject(err);
  },
);

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  config?: T,
) => {
  try {
    // console.log(`Request: ${ method.toUpperCase() } ${ url } `, config);

    if (method === 'get' || method === 'delete') {
      const response = await apiClient[method](url);
      return response;

    } else {
      return await apiClient[method](url, config);
    }

  } catch (err: any) {
    console.error('API ERROR:::', err);
    throw err;
  }
};


export default requestHandler;
