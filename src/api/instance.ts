import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';

export const API_BASE_INSTANCE = axios.create({
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
});
