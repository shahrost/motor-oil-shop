import apiClient from "../api/apiClient";

// دریافت سفارش‌ها
export async function fetchOrders() {
  const response = await apiClient.get("/orders");
  return response.data.data;
}

// ثبت سفارش جدید
export async function createOrder(order) {
  const response = await apiClient.post("/orders", order);
  return response.data.data;
}

// تغییر وضعیت سفارش
export async function updateOrderStatusService(id, status) {
  const response = await apiClient.put(`/orders/${id}`, {
    status,
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
