import { useContext } from "react";
import CustomerAuthContext from "../../../context/CustomerAuthContext";

// صفحه‌ی «حساب کاربری»: اطلاعات مشتری و خروج
function useAccount() {
  const { customer, logout } = useContext(CustomerAuthContext);

  return {
    customer,
    logout,
  };
}

export default useAccount;
