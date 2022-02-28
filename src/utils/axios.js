import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
