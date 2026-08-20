import apiClient from "../api/apiClient";

export async function registerCustomer(data) {
  const response = await apiClient.post("/customers/register", data);

  return response.data.data;
}

export async function loginCustomer(data) {
  const response = await apiClient.post("/customers/login", data);

  return response.data.data;
}

export async function fetchCustomerProfile() {
  const token = localStorage.getItem("customerToken");

  const response = await apiClient.get("/customers/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function fetchMyOrders() {
  const token = localStorage.getItem("customerToken");

  const response = await apiClient.get("/customers/me/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}
