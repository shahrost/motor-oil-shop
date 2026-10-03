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

  formData.append("priceCheck", Number(product.priceCheck || 0));

  formData.append("cartonCount", Number(product.cartonCount || 0));

  formData.append("stock", Number(product.stock || 0));

  formData.append("isBestSeller", product.isBestSeller || false);

  formData.append("isActive", product.isActive ?? true);

  formData.append("promotion", JSON.stringify(product.promotion || {}));

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

    if (key === "promotion") {
      formData.append(key, JSON.stringify(value || {}));
      return;
    }

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

// آپلود عکس‌ها به‌صورت دسته‌ای (هر بار چند فایل) تا درخواست حجیم نشه و قطع نشه.
// خروجی: { "نام فایل اصلی": "نام فایل روی سرور" }

const IMAGE_BATCH_SIZE = 20;

export async function uploadProductImagesService(imageFiles, onProgress) {
  const uploaded = {};

  for (let i = 0; i < imageFiles.length; i += IMAGE_BATCH_SIZE) {
    const formData = new FormData();

    imageFiles
      .slice(i, i + IMAGE_BATCH_SIZE)
      .forEach((file) => formData.append("images", file));

    const response = await apiClient.post("/products/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    (response.data.data || []).forEach((item) => {
      uploaded[item.name] = item.filename;
    });

    if (onProgress) {
      onProgress(Math.min(i + IMAGE_BATCH_SIZE, imageFiles.length));
    }
  }

  return uploaded;
}

// ایمپورت گروهی محصولات (فایل اکسل + عکس‌های آپلودشده)
// سرور ایمپورت رو پس‌زمینه اجرا می‌کنه و فوراً jobId برمی‌گردونه؛ بعدش وضعیت
// هر چند ثانیه چک می‌شه تا درخواست طولانی توسط پروکسی قطع نشه.

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_MS = 15 * 60 * 1000;
const POLL_MAX_FAILURES = 5;

export async function importProductsService(
  excelFile,
  uploadedImages = {},
  removeMissing = false,
  onStage,
) {
  const formData = new FormData();

  formData.append("file", excelFile);

  formData.append("removeMissing", String(removeMissing));

  formData.append("uploadedImages", JSON.stringify(uploadedImages));

  if (onStage) onStage("ارسال فایل اکسل به سرور");

  const start = await apiClient.post("/products/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const { jobId } = start.data.data;

  const startedAt = Date.now();
  let failures = 0;

  while (Date.now() - startedAt < POLL_MAX_MS) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

    let job;

    try {
      const response = await apiClient.get(`/products/import/${jobId}`);

      job = response.data.data;
      failures = 0;
    } catch (error) {
      if (error.response?.status === 404) throw error;

      failures += 1;

      if (failures >= POLL_MAX_FAILURES) throw error;

      continue;
    }

    if (onStage) onStage(job.stage);

    if (job.status === "done") return { data: job.results };

    if (job.status === "error") {
      const error = new Error(job.error);
      error.response = { data: { message: job.error } };
      throw error;
    }
  }

  throw new Error("ایمپورت بیش از حد طول کشید");
}

// بروزرسانی گروهی قیمت‌ها (فایل اکسل با ستون کد محصول و قیمت)

export async function bulkUpdatePricesService(excelFile) {
  const formData = new FormData();

  formData.append("file", excelFile);

  const response = await apiClient.post(
    "/products/bulk-price-update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
