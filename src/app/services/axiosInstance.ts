import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const baseURL: string = "http://localhost:5000/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fix interceptor type
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ✅ Fix
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
