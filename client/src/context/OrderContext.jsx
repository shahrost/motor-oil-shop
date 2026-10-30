import { createContext, useCallback, useState } from "react";

import {
  fetchOrders,
  createOrder,
  updateOrderStatusService,
  setOrderDoneService,
  setItemUnavailableService,
  deleteOrderService,
} from "../services/orderService";

const OrderContext = createContext();

// دریافت و نگهداری سفارش‌ها (پنل ادمین) و ثبت سفارش مشتری
export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadError, setLoadError] = useState("");

  // silent: بروزرسانی خودکار پس‌زمینه؛ پیام «در حال دریافت» نشون نمی‌ده و خطای موقتش لیست فعلی رو پاک نمی‌کنه
  const loadOrders = useCallback(async ({ silent = false } = {}) => {
    if (!silent) {
      setLoadingOrders(true);
      setLoadError("");
    }

    try {
      const response = await fetchOrders();

      setOrders(response || []);
      setLoadError("");
    } catch (error) {
      console.log("خطا در دریافت سفارش‌ها", error);

      if (!silent) {
        setLoadError(error.response?.data?.message || "دریافت سفارش‌ها از سرور ناموفق بود");
      }
    } finally {
      if (!silent) setLoadingOrders(false);
    }
  }, []);

  // ثبت سفارش جدید (وضعیت و تاریخ رو سرور می‌ذاره)؛ در صورت خطا throw می‌کنه تا فرم سفارش سبد رو پاک نکنه
  async function addOrder(order) {
    const savedOrder = await createOrder(order);

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

  // تیک فوراً روی صفحه عوض می‌شه؛ اگه سرور خطا داد برمی‌گرده
  async function setOrderDone(id, done) {
    const markDone = (value) =>
      setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, done: value } : order)));

    markDone(done);

    try {
      await setOrderDoneService(id, done);
    } catch (error) {
      console.log("خطا در ثبت تیک سفارش", error);
      markDone(!done);
    }
  }

  // تیک ناموجود هم مثل تیک «انجام شد» فوراً عوض می‌شه و با خطای سرور برمی‌گرده
  async function setItemUnavailable(id, index, unavailable) {
    const markItem = (value) =>
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? {
                ...order,
                items: order.items.map((item, i) =>
                  i === index ? { ...item, unavailable: value } : item,
                ),
              }
            : order,
        ),
      );

    markItem(unavailable);

    try {
      await setItemUnavailableService(id, index, unavailable);
    } catch (error) {
      console.log("خطا در ثبت ناموجود", error);
      markItem(!unavailable);
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
        setOrderDone,
        setItemUnavailable,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
