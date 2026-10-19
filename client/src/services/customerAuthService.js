import apiClient from "../api/apiClient";
import { getCustomerToken } from "./customerTokenStorage";

export async function registerCustomer(data) {
  const response = await apiClient.post("/customers/register", data);

  return response.data.data;
}

export async function loginCustomer(data) {
  const response = await apiClient.post("/customers/login", data);

  return response.data.data;
}

export async function fetchCustomerProfile() {
  const token = getCustomerToken();

  const response = await apiClient.get("/customers/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function fetchMyOrders() {
  const token = getCustomerToken();

  const response = await apiClient.get("/customers/me/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

// علاقه‌مندی‌ها: پاسخ سرور لیست کامل شناسه‌های علاقه‌مندی بعد از تغییره
export async function addFavoriteService(productId) {
  const response = await apiClient.put(`/customers/me/favorites/${productId}`, null, {
    headers: {
      Authorization: `Bearer ${getCustomerToken()}`,
    },
  });

  return response.data.data;
}

export async function removeFavoriteService(productId) {
  const response = await apiClient.delete(`/customers/me/favorites/${productId}`, {
    headers: {
      Authorization: `Bearer ${getCustomerToken()}`,
    },
  });

  return response.data.data;
}
