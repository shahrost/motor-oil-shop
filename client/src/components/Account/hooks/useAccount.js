import { useContext, useEffect, useState } from "react";
import CustomerAuthContext from "../../../context/CustomerAuthContext";
import { fetchMyOrders } from "../../../services/customerAuthService";

function useAccount() {
  const { customer, logout } = useContext(CustomerAuthContext);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchMyOrders()
      .then((data) => setOrders(data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, []);

  return {
    customer,
    logout,
    orders,
    loadingOrders,
  };
}

export default useAccount;
