import apiClient from "../api/apiClient";

// دریافت محصولات

export async function fetchProducts() {
  const response = await apiClient.get("/products");

  return response.data;
}

// ساخت محصول

export async function createProductService(product) {
  const response = await apiClient.post("/products", product);

  return response.data;
}

// ویرایش محصول

export async function updateProductService(id, product) {
  const response = await apiClient.put(`/products/${id}`, product);

  return response.data;
}

// حذف محصول

export async function deleteProductService(id) {
  await apiClient.delete(`/products/${id}`);
}

// حذف همه محصولات

export async function removeAllProducts() {
  await apiClient.delete("/products");
}
