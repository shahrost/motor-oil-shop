import apiClient from "../api/apiClient";
import { getCustomerToken } from "./customerTokenStorage";

// دریافت سفارش‌ها
export async function fetchOrders() {
  const response = await apiClient.get("/orders");
  return response.data.data;
}

// فایل اکسل سفارش‌های یک ماه شمسی (ادمین). خطا: Error با پیام سرور و status
export async function downloadOrdersExcel(year, month) {
  try {
    const response = await apiClient.get("/orders/export", {
      params: { year, month },
      responseType: "blob",
    });

    return response.data;
  } catch (error) {
    let message = "دریافت فایل اکسل ناموفق بود";

    // با responseType: "blob" پیام خطای JSON سرور هم Blob برمی‌گرده
    try {
      message = JSON.parse(await error.response.data.text()).message || message;
    } catch {
      // پاسخ JSON نبود (قطعی شبکه)؛ همون پیام پیش‌فرض
    }

    throw Object.assign(new Error(message), { status: error.response?.status });
  }
}

// ثبت سفارش جدید؛ مشتری واردشده توکن خودش رو می‌فرسته تا سفارش در «خریدهای من» بیاد
// (شناسه‌ی مشتری فقط از توکن خونده می‌شه). مهمان: بدون هدر مشتری
export async function createOrder(order) {
  const token = getCustomerToken();
  const response = await apiClient.post(
    "/orders",
    order,
    token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
  );
  return response.data.data;
}

// تغییر وضعیت سفارش
export async function updateOrderStatusService(id, status) {
  const response = await apiClient.put(`/orders/${id}`, {
    status,
  });
  return response.data.data;
}

// تیک «انجام شد» سفارش (ادمین)
export async function setOrderDoneService(id, done) {
  const response = await apiClient.put(`/orders/${id}/done`, {
    done,
  });
  return response.data.data;
}

// حذف سفارش
export async function deleteOrderService(id) {
  await apiClient.delete(`/orders/${id}`);
}

// حذف همه سفارش‌ها (ادمین)
export async function deleteAllOrders() {
  await apiClient.delete("/orders");
}
