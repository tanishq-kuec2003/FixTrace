import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Express server port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept all outbound requests to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;