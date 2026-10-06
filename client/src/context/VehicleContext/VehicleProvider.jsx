import { useCallback, useEffect, useMemo, useState } from "react";

import { useLocation } from "react-router-dom";

import VehicleContext from "./VehicleContext";
import defaultVehicles from "../../data/vehicles";
import { fetchVehicles } from "../../services/vehicleService";

// تا وقتی خودرویی از ایمپورت ادمین توی دیتابیس نباشه، دیتای پیش‌فرض نشون داده می‌شه.
function VehicleProvider({ children }) {
  const [dbVehicles, setDbVehicles] = useState([]);

  const reloadVehicles = useCallback(async () => {
    try {
      const response = await fetchVehicles();

      setDbVehicles(response.data || []);
    } catch (error) {
      console.log("خطا در دریافت خودروها", error);
    }
  }, []);

  // لیست خودروها حجیمه و فقط صفحه‌های خودرو و پنل ادمین لازمش دارن؛
  // پس فقط وقتی کاربر اولین بار به اون صفحه‌ها رفت دریافت می‌شه تا لود صفحه‌ی اصلی کند نشه.
  const { pathname } = useLocation();
  const needsVehicles = /^\/(vehicle|admin)/.test(pathname);
  const [requested, setRequested] = useState(false);

  if (needsVehicles && !requested) setRequested(true);

  // برای منوی «خودروها» توی هدر: با باز شدن منو دریافت لیست شروع می‌شه
  const requestVehicles = useCallback(() => setRequested(true), []);

  useEffect(() => {
    if (!requested) return;

    async function loadVehicles() {
      try {
        const response = await fetchVehicles();

        setDbVehicles(response.data || []);
      } catch (error) {
        console.log("خطا در دریافت خودروها", error);
      }
    }

    loadVehicles();
  }, [requested]);

  const value = useMemo(
    () => ({
      vehicles: dbVehicles.length > 0 ? dbVehicles : defaultVehicles,
      reloadVehicles,
      requestVehicles,
    }),
    [dbVehicles, reloadVehicles, requestVehicles],
  );

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
}

export default VehicleProvider;
