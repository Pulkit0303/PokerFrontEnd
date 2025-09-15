// api/axiosInstance.js
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

// Token cache to avoid re-fetching too often
let tokenCache = {
  token: null,
  expiry: null
};

const useAxios = () => {
  const { getToken } = useAuth();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api',
    timeout: 30000,
  });

  // Helper: decode JWT payload safely
  const parseJwt = (token) => {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(base64).split('').map(c => '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  };

  instance.interceptors.request.use(async (config) => {
    try {
      const now = Date.now();

      // Use cached token if still valid (with 5-minute buffer)
      if (tokenCache.token && tokenCache.expiry && now < (tokenCache.expiry - 5 * 60 * 1000)) {
        config.headers.Authorization = `Bearer ${tokenCache.token}`;
        return config;
      }

  // Get fresh Clerk token (allow Clerk to use its cache by default)
  const token = await getToken({ skipCache: false });

      if (token) {
        tokenCache.token = token;
        const payload = parseJwt(token);
        // If token contains exp claim, use it; otherwise fallback to 55 minutes
        tokenCache.expiry = payload && payload.exp ? payload.exp * 1000 : (now + (55 * 60 * 1000));
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        tokenCache = { token: null, expiry: null };
      }
    } catch (error) {
      tokenCache = { token: null, expiry: null };
    }
    return config;
  });

  // Handle 401/403 errors and retry with fresh token
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If we get 401 or 403 and haven't already retried
      if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;

        // Clear cached token so we force a fresh fetch
        tokenCache = { token: null, expiry: null };

        try {
          // If backend indicates jwt expired, force skipCache:true to fetch a new token
          const forceRefresh = error.response?.data?.error === 'jwt expired';

          const newToken = await getToken({ skipCache: true });

          if (newToken) {
            tokenCache.token = newToken;
            const payload = parseJwt(newToken);
            tokenCache.expiry = payload && payload.exp ? payload.exp * 1000 : (Date.now() + (55 * 60 * 1000));
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return instance(originalRequest);
          }
        } catch (refreshError) {
          tokenCache = { token: null, expiry: null };
        }
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
