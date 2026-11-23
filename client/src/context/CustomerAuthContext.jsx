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
  const [loadError, setLoadError] = useState(false);
  const [profileRetry, setProfileRetry] = useState(0);

  useEffect(() => {
    if (!hasToken) return;
    let active = true;
    const token = getCustomerToken();
    const isCurrent = () => active && getCustomerToken() === token;

    fetchCustomerProfile()
      .then((data) => {
        if (!isCurrent()) return;
        setCustomer(data);
        setLoadError(false);
      })
      .catch((error) => {
        if (!isCurrent()) return;
        if ([401, 403, 404].includes(error.response?.status)) {
          setLoading(false);
          clearCustomerToken();
          setCustomer(null);
          setLoadError(false);
        } else {
          setLoadError(true);
        }
      })
      .finally(() => { if (isCurrent()) setLoading(false); });
    return () => { active = false; };
  }, [hasToken, profileRetry]);

  function retryProfile() {
    setLoadError(false);
    setLoading(true);
    setProfileRetry((retry) => retry + 1);
  }

  async function register(data) {
    const result = await registerCustomer(data);

    saveCustomerToken(result.token);
    setCustomer(result.customer);
    setLoadError(false);
    setLoading(false);
  }

  async function login(data) {
    const result = await loginCustomer(data);

    saveCustomerToken(result.token);
    setCustomer(result.customer);
    setLoadError(false);
    setLoading(false);
  }

  function logout() {
    clearCustomerToken();
    setCustomer(null);
    setLoadError(false);
    setLoading(false);
  }

  return (
    <CustomerAuthContext.Provider
      value={{ customer, loading, loadError, retryProfile, register, login, logout }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export default CustomerAuthContext;
