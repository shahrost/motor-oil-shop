import apiClient from "../api/apiClient";

export async function loginAdmin(credentials) {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data.data;
}

export async function verifyToken() {
  const response = await apiClient.get("/auth/verify");

  return response.data;
}
