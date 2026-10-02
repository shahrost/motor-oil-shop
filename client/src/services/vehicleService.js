import apiClient from "../api/apiClient";

// دریافت همه خودروها

export async function fetchVehicles() {
  const response = await apiClient.get("/vehicles");

  return response.data;
}

// آپلود عکس‌ها به‌صورت دسته‌ای (هر بار چند فایل) تا درخواست حجیم نشه و قطع نشه.
// خروجی: { "نام فایل اصلی": "نام فایل روی سرور" }

const IMAGE_BATCH_SIZE = 20;

export async function uploadVehicleImagesService(imageFiles, onProgress) {
  const uploaded = {};

  for (let i = 0; i < imageFiles.length; i += IMAGE_BATCH_SIZE) {
    const formData = new FormData();

    imageFiles
      .slice(i, i + IMAGE_BATCH_SIZE)
      .forEach((file) => formData.append("images", file));

    const response = await apiClient.post("/vehicles/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    response.data.forEach((item) => {
      uploaded[item.name] = item.filename;
    });

    if (onProgress) {
      onProgress(Math.min(i + IMAGE_BATCH_SIZE, imageFiles.length));
    }
  }

  return uploaded;
}

// ایمپورت گروهی خودروها (فایل اکسل + عکس‌های آپلودشده)

export async function importVehiclesService(
  excelFile,
  uploadedImages = {},
  removeMissing = false,
) {
  const formData = new FormData();

  formData.append("file", excelFile);

  formData.append("removeMissing", String(removeMissing));

  formData.append("uploadedImages", JSON.stringify(uploadedImages));

  const response = await apiClient.post("/vehicles/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
