import { useEffect, useState } from "react";
import { fetchMyOrders } from "../../../services/customerAuthService";

// «خریدهای من»: سفارش‌هایی که مشتری با حساب خودش ثبت کرده (جدیدترین اول، از سرور)
function useAccountOrders() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchMyOrders()
      .then((data) => setOrders(data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, []);

  return {
    orders,
    loadingOrders,
  };
}

export default useAccountOrders;
