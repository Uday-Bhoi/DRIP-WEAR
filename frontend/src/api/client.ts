import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const SERVER_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, '');

export const resolveImageUrl = (url?: string): string => {
  if (!url) return '';
  if (url.startsWith('/static/') || url.startsWith('/uploads/')) {
    return `${SERVER_ORIGIN}${url}`;
  }
  return url;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Access Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('dripwear_access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Silence unhandled 401 errors so session remains active
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);
