import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { navigateTo } from "../utils/navigation";

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  refreshQueue = [];
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const original = error.config;

    // If not 401 or already retried or refresh token endpoint, reject
    if (
      error.response?.status !== 401 ||
      original?._retry ||
      original?.url?.includes("/auth/refresh-token") ||
      original?.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token) => {
            original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshRes = await api.post("/auth/refresh-token");
      const newToken = refreshRes.data?.data?.accessToken;
      const user = refreshRes.data?.data?.user;

      if (!newToken) {
        throw new Error("Missing accessToken from refresh");
      }

      useAuthStore.getState().setAuth({
        user: user,
        accessToken: newToken,
        refreshToken: null,
      });

      processQueue(null, newToken);

      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newToken}`;

      return api(original);
    } catch (refreshErr) {
      console.error("[Refresh Token] Failed:", refreshErr);

      processQueue(refreshErr, null);

      const { clearAuth } = useAuthStore.getState();
      clearAuth();

      // Clear localStorage as well
      localStorage.removeItem("auth-storage");
      sessionStorage.removeItem("auth-storage");

      // Navigate to login
      navigateTo("/login");

      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  },
);
