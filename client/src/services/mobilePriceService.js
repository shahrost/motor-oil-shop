import apiClient from "../api/apiClient";

export async function applyMobilePrices(field, changes) {
  const response = await apiClient.post("/products/price-changes", { field, changes }, {
    // A lost response can mean some rows were saved. Re-read and review instead of retrying.
    __retryCount: 3,
    timeout: 90000,
  });
  return response.data.data;
}
