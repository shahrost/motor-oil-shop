import { createContext, useEffect, useState } from "react";
import {
  registerCustomer,
  loginCustomer,
  fetchCustomerProfile,
} from "../services/customerAuthService";
import {
  getCustomerToken,
  saveCustomerToken,
  clearCustomerToken,
} from "../services/customerTokenStorage";

const CustomerAuthContext = createContext();

export function CustomerAuthProvider({ children }) {
  const hasToken = Boolean(getCustomerToken());

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(hasToken);

  useEffect(() => {
    if (!hasToken) return;

    fetchCustomerProfile()
      .then((data) => setCustomer(data))
      .catch(() => {
        clearCustomerToken();
      })
      .finally(() => setLoading(false));
  }, [hasToken]);

  async function register(data) {
    const result = await registerCustomer(data);

    saveCustomerToken(result.token);
    setCustomer(result.customer);
  }

  async function login(data) {
    const result = await loginCustomer(data);

    saveCustomerToken(result.token);
    setCustomer(result.customer);
  }

  function logout() {
    clearCustomerToken();
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
