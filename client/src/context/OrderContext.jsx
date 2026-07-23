import { createContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");

    return saved ? JSON.parse(saved) : [];
  });

  function addOrder(order) {
    setOrders((prev) => [
      ...prev,

      {
        ...order,
        id: Date.now(),
        status: "جدید",
        date: new Date().toLocaleDateString("fa-IR"),
      },
    ]);
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order,
      ),
    );
  }

  function deleteOrder(id) {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
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
