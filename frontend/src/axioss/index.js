import axios from 'axios';

const instance = axios.create({
  withCredentials:true,    
  baseURL: 'http://13.127.252.69:5000/api',
});

export default instance;