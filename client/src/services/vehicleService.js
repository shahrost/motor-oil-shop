import apiClient from "../api/apiClient";

// مدل‌های یک برند (سبک‌تر از لیست کامل)

export async function fetchBrandVehicles(brand) {
  const response = await apiClient.get(
    `/vehicles/brand/${encodeURIComponent(brand)}`,
  );

  return response.data.data || [];
}

// یک خودرو با شناسه؛ نبود (404) ← null

export async function fetchVehicleById(id) {
  try {
    const response = await apiClient.get(
      `/vehicles/item/${encodeURIComponent(id)}`,
    );

    return response.data.data || null;
  } catch (error) {
    if (error.response?.status === 404) return null;

    throw error;
  }
}

// برندهای خودرو با تعداد مدل‌ها: [{ name, nameEn, count }] (خیلی سبک‌تر از لیست کامل)

export async function fetchVehicleBrands() {
  const response = await apiClient.get("/vehicles/brands");

  return response.data.data || [];
}

// همه‌ی خودروها فقط با فیلدهای کارت، برای جستجوی صفحه‌ی «خودروها» (فیلد خالی از سرور
// نمیاد ← پیش‌فرض)

export async function fetchVehicleSearchList() {
  const response = await apiClient.get("/vehicles/search-list");

  return (response.data.data || []).map((vehicle) => ({
    nameEn: "",
    brandEn: "",
    image: "",
    oilCapacity: "",
    ...vehicle,
    viscosities: vehicle.viscosities || [],
  }));
}

// خودروهای سازگار هر فیلتر: { "<کد محصول>": [{ name, nameEn }] }

export async function fetchFilterCompatibility() {
  const response = await apiClient.get("/vehicles/filter-compatibility");

  return response.data.data || {};
}
