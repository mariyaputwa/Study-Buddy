import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/', // Replace with your backend server's address
});

export default instance;
