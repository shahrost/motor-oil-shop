import { createContext, useCallback, useState } from "react";

import {
  fetchOrders,
  createOrder,
  updateOrderStatusService,
  deleteOrderService,
} from "../services/orderService";

const OrderContext = createContext();

// دریافت و نگهداری سفارش‌ها (پنل ادمین) و ثبت سفارش مشتری
export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadError, setLoadError] = useState("");

  const loadOrders = useCallback(async () => {
    setLoadingOrders(true);
    setLoadError("");

    try {
      const response = await fetchOrders();

      setOrders(response || []);
    } catch (error) {
      console.log("خطا در دریافت سفارش‌ها", error);
      setLoadError(error.response?.data?.message || "دریافت سفارش‌ها از سرور ناموفق بود");
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  // ثبت سفارش جدید؛ در صورت خطا throw می‌کنه تا فرم سفارش سبد رو پاک نکنه
  async function addOrder(order) {
    const savedOrder = await createOrder({
      ...order,
      status: "جدید",
      date: new Date().toLocaleDateString("fa-IR"),
    });

    setOrders((prev) => [...prev, savedOrder]);

    return savedOrder;
  }

  async function updateOrderStatus(id, status) {
    try {
      const updated = await updateOrderStatusService(id, status);

      setOrders((prev) => prev.map((order) => (order.id === id ? updated : order)));
    } catch (error) {
      console.log("خطا در تغییر وضعیت", error);
    }
  }

  async function deleteOrder(id) {
    try {
      await deleteOrderService(id);

      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.log("خطا در حذف سفارش", error);
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        loadingOrders,
        loadError,
        loadOrders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
