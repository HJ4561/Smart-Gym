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

// Normalize errors. Besides the message, the error carries what forms need to show each
// problem under its own field: `status` (0 = no answer), `detail`, `fields` ({field: message}),
// `code` and the raw `data`.
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const payload = err?.response?.data;
    const isObj = payload && typeof payload === 'object' && !Array.isArray(payload);
    const fields = {};
    if (isObj) {
      Object.entries(payload).forEach(([k, v]) => {
        if (k === 'detail' || k === 'code') return;
        const msg = Array.isArray(v) ? v.join(' ') : (typeof v === 'string' ? v : null);
        if (msg) fields[k] = msg;
      });
    }
    const message =
      payload?.detail ||
      (typeof payload === 'string' && !payload.trimStart().startsWith('<') ? payload : null) ||
      (Object.keys(fields).length
        ? Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join(' | ')
        : null) ||
      err.message ||
      'Request failed';
    const error = new Error(message);
    error.status = err?.response?.status || 0;
    error.detail = typeof payload?.detail === 'string' ? payload.detail : '';
    error.fields = fields;
    error.code = isObj && typeof payload.code === 'string' ? payload.code : '';
    error.data = payload;
    return Promise.reject(error);
  },
);

export default api;