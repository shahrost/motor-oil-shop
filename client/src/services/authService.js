import apiClient from "../api/apiClient";

export async function verifyToken() {
  const response = await apiClient.get("/auth/verify");

  return response.data;
}
