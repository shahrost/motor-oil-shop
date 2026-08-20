import { createContext, useEffect, useState } from "react";
import {
  registerCustomer,
  loginCustomer,
  fetchCustomerProfile,
} from "../services/customerAuthService";

const CustomerAuthContext = createContext();

export function CustomerAuthProvider({ children }) {
  const hasToken = Boolean(localStorage.getItem("customerToken"));

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(hasToken);

  useEffect(() => {
    if (!hasToken) return;

    fetchCustomerProfile()
      .then((data) => setCustomer(data))
      .catch(() => {
        localStorage.removeItem("customerToken");
      })
      .finally(() => setLoading(false));
  }, [hasToken]);

  async function register(data) {
    const result = await registerCustomer(data);

    localStorage.setItem("customerToken", result.token);
    setCustomer(result.customer);
  }

  async function login(data) {
    const result = await loginCustomer(data);

    localStorage.setItem("customerToken", result.token);
    setCustomer(result.customer);
  }

  function logout() {
    localStorage.removeItem("customerToken");
    setCustomer(null);
  }

  return (
    <CustomerAuthContext.Provider
      value={{ customer, loading, register, login, logout }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export default CustomerAuthContext;
