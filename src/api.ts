import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
  headers: {
    accept: 'application/json',
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});

export default api;
