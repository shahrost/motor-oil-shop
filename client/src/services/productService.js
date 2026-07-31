import apiClient from "../api/apiClient";

const STORAGE_KEY = "products";

// دریافت محصولات

export async function fetchProducts() {
  try {
    const response = await apiClient.get("/products");

    return response.data;
  } catch (error) {
    console.log("Backend unavailable, loading local products");

    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  }
}

// ساخت محصول

export async function createProductService(product) {
  try {
    const response = await apiClient.post("/products", product);

    return response.data;
  } catch (error) {
    console.log("Saving product locally");

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const updated = [...saved, product];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return product;
  }
}

// ویرایش محصول

export async function updateProductService(id, product) {
  try {
    const response = await apiClient.put(`/products/${id}`, product);

    return response.data;
  } catch (error) {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const updated = saved.map((item) => (item.id === id ? product : item));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return product;
  }
}

// حذف محصول

export async function deleteProductService(id) {
  try {
    await apiClient.delete(`/products/${id}`);
  } catch (error) {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const updated = saved.filter((item) => item.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}

// حذف همه محصولات

export async function removeAllProducts() {
  try {
    await apiClient.delete("/products");
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}
