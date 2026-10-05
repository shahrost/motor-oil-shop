import { useEffect, useState } from "react";
import { verifyToken } from "../services/authService";

// وضعیت ورود ادمین: "checking" | "authorized" | "unauthorized"
function useAdminAuthCheck() {
  const hasToken = Boolean(localStorage.getItem("token"));
  const [status, setStatus] = useState(hasToken ? "checking" : "unauthorized");

  useEffect(() => {
    if (!hasToken) return;

    verifyToken()
      .then(() => setStatus("authorized"))
      .catch((error) => {
        const code = error.response?.status;

        // فقط توکن نامعتبر/منقضی باعث خروج می‌شه؛ قطعی موقت سرور ادمین رو بیرون نمی‌اندازه
        if (code === 401 || code === 403) {
          localStorage.removeItem("token");
          setStatus("unauthorized");
          return;
        }

        setStatus("authorized");
      });
  }, [hasToken]);

  return status;
}

export default useAdminAuthCheck;
