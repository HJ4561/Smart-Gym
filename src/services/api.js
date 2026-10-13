// src/services/api.js
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token if present (public site doesn't login, but keeps
// the door open for a "check my registration" login later)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize errors
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const payload = err?.response?.data;
    const message =
      payload?.detail ||
      (typeof payload === 'string' ? payload : null) ||
      (payload && typeof payload === 'object'
        ? Object.entries(payload)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
            .join(' | ')
        : null) ||
      err.message ||
      'Request failed';
    return Promise.reject(new Error(message));
  },
);

export default api;