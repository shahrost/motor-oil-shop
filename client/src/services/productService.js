import apiClient from "../api/apiClient";

// دریافت همه محصولات

export async function fetchProducts() {
  const response = await apiClient.get("/products");

  return response.data;
}

// ساخت محصول جدید

export async function createProductService(product) {
  const formData = new FormData();

  const productName =
    product.name ||
    `${product.brand || ""} ${product.viscosity || ""} ${product.volume || ""}`.trim();

  formData.append("name", productName);

  formData.append("brand", product.brand || "");

  formData.append("category", product.category || "");

  formData.append("volume", product.volume || "");

  formData.append("viscosity", product.viscosity || "");

  formData.append("api", product.api || "");

  formData.append("acea", product.acea || "");

  formData.append("oilType", product.oilType || "");

  formData.append("description", product.description || "");

  formData.append("price", Number(product.price || 0));

  formData.append("cartonCount", Number(product.cartonCount || 0));

  formData.append("stock", Number(product.stock || 0));

  formData.append("isBestSeller", product.isBestSeller || false);

  formData.append("isActive", product.isActive ?? true);

  // ارسال عکس واقعی

  if (product.image?.file) {
    formData.append("image", product.image.file);
  }

  const response = await apiClient.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

// ویرایش محصول

export async function updateProductService(id, product) {
  if (!product.image?.file) {
    const response = await apiClient.put(`/products/${id}`, product);

    return response.data;
  }

  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (key === "image") return;

    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  formData.append("image", product.image.file);

  const response = await apiClient.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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
