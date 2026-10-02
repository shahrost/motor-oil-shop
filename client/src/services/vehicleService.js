import apiClient from "../api/apiClient";

// دریافت همه خودروها

export async function fetchVehicles() {
  const response = await apiClient.get("/vehicles");

  return response.data;
}

// ایمپورت گروهی خودروها (فایل اکسل + عکس‌ها)

export async function importVehiclesService(
  excelFile,
  imageFiles = [],
  removeMissing = false,
) {
  const formData = new FormData();

  formData.append("file", excelFile);

  formData.append("removeMissing", String(removeMissing));

  imageFiles.forEach((file) => formData.append("images", file));

  const response = await apiClient.post("/vehicles/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
