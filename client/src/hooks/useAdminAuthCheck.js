import { useEffect, useState } from "react";
import { verifyToken } from "../services/authService";
import { getAdminToken, clearAdminToken } from "../services/adminTokenStorage";

// وضعیت ورود ادمین: "checking" | "authorized" | "unauthorized"
function useAdminAuthCheck() {
  const hasToken = Boolean(getAdminToken());
  const [status, setStatus] = useState(hasToken ? "checking" : "unauthorized");

  useEffect(() => {
    if (!hasToken) return;

    verifyToken()
      .then(() => setStatus("authorized"))
      .catch((error) => {
        const code = error.response?.status;

        // فقط توکن نامعتبر/منقضی باعث خروج می‌شه؛ قطعی موقت سرور ادمین رو بیرون نمی‌اندازه
        if (code === 401 || code === 403) {
          clearAdminToken();
          setStatus("unauthorized");
          return;
        }

        setStatus("authorized");
      });
  }, [hasToken]);

  return status;
}

export default useAdminAuthCheck;
