import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3001/v1/api',
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
