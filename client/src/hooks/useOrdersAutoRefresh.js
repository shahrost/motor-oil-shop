import { useEffect } from "react";

const REFRESH_INTERVAL_MS = 30 * 1000;

// سفارش‌ها رو یک بار می‌گیره و بعد هر ۳۰ ثانیه و هر بار که ادمین به تب برمی‌گرده بی‌صدا بروز می‌کنه،
// تا سفارشی که بعد از باز شدن پنل ثبت شده بدون رفرش صفحه دیده بشه
function useOrdersAutoRefresh(loadOrders) {
  useEffect(() => {
    loadOrders();

    const refresh = () => {
      if (document.visibilityState === "visible") loadOrders({ silent: true });
    };

    const timer = setInterval(refresh, REFRESH_INTERVAL_MS);

    document.addEventListener("visibilitychange", refresh);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [loadOrders]);
}

export default useOrdersAutoRefresh;
