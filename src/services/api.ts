import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/apod',
});

export default api;
