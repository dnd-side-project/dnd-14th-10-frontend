import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // 쿠키를 자동으로 포함 (HttpOnly 쿠키용)
});

export { apiClient };
