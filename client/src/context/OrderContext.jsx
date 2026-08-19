import { createContext, useCallback, useState } from "react";

import {
  fetchOrders,
  createOrder,
  updateOrderStatusService,
  deleteOrderService,
} from "../services/orderService";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // دریافت سفارش‌ها
  // مسئول دریافت و نگهداری سفارش‌ها در Context است.
  const loadOrders = useCallback(async () => {
    try {
      const response = await fetchOrders();

      setOrders(response || []);
    } catch (error) {
      console.log("خطا در دریافت سفارش‌ها", error);
    }
  }, []);

  // ثبت سفارش جدید
  async function addOrder(order) {
    const newOrder = {
      ...order,

      status: "جدید",

      date: new Date().toLocaleDateString("fa-IR"),
    };

    try {
      const savedOrder = await createOrder(newOrder);

      setOrders((prev) => [...prev, savedOrder]);
    } catch (error) {
      console.log("خطا در ثبت سفارش", error);
    }
  }

  // تغییر وضعیت سفارش
  async function updateOrderStatus(id, status) {
    try {
      const updated = await updateOrderStatusService(id, status);

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updated : order)),
      );
    } catch (error) {
      console.log("خطا در تغییر وضعیت", error);
    }
  }

  // حذف سفارش
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
