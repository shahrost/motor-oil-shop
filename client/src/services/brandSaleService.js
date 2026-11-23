import apiClient from "../api/apiClient";

export async function fetchBrandSales() {
  const response = await apiClient.get("/products/brand-sales");
  return response.data.data;
}

export async function setBrandSale(brand, closed) {
  const response = await apiClient.put("/products/brand-sales", { brand, closed }, { __retryCount: 3 });
  return response.data.data;
}
