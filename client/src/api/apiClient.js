import axios from "axios";

import { API_URL } from "./config";

const apiClient = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// سرور گاهی چند ثانیه (موقع ری‌استارت هاست) 502/503/504 برمی‌گردونه؛ درخواست‌ها چند بار
// با فاصله‌ی بیشتر تکرار می‌شن. درخواست‌های غیر GET فقط روی 503 تکرار می‌شن
// (یعنی درخواست اصلاً به سرور نرسیده) تا مثلاً سفارش دوبار ثبت نشه.
const RETRY_DELAYS_MS = [1000, 2000, 4000];

function shouldRetry(error) {
  const config = error.config;

  if (!config || (config.__retryCount || 0) >= RETRY_DELAYS_MS.length) return false;

  const status = error.response?.status;
  const isRead = (config.method || "get").toLowerCase() === "get";

  if (isRead) return !error.response || [502, 503, 504].includes(status);

  return status === 503;
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!shouldRetry(error)) return Promise.reject(error);

    const config = error.config;
    const delay = RETRY_DELAYS_MS[config.__retryCount || 0];

    config.__retryCount = (config.__retryCount || 0) + 1;

    await new Promise((resolve) => setTimeout(resolve, delay));

    return apiClient(config);
  },
);

export default apiClient;
