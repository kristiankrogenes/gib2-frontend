import axios from 'axios';

let baseURL = 'https://gib2backend.herokuapp.com/api/';

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:8000/api/';
}

console.log(baseURL);

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
    }
});

export default axiosInstance;

 