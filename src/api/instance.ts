import axios from 'axios';

export const API_BASE_INSTANCE = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  headers: { 'Content-Type': 'application/json' },
});