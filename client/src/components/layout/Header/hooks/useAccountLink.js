import { useContext } from "react";

import CustomerAuthContext from "../../../../context/CustomerAuthContext";

// لینک حساب در هدر: مشتری واردشده ← صفحه‌ی حساب با نام کوچکش، وگرنه ← ثبت‌نام
function useAccountLink() {
  const { customer } = useContext(CustomerAuthContext);

  return {
    to: customer ? "/account" : "/register",
    customerName: customer?.name || "",
    firstName: customer ? customer.name.split(" ")[0] : "",
  };
}

export default useAccountLink;
