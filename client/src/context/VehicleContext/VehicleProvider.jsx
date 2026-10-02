import { useCallback, useEffect, useMemo, useState } from "react";

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

  useEffect(() => {
    async function loadVehicles() {
      try {
        const response = await fetchVehicles();

        setDbVehicles(response.data || []);
      } catch (error) {
        console.log("خطا در دریافت خودروها", error);
      }
    }

    loadVehicles();
  }, []);

  const value = useMemo(
    () => ({
      vehicles: dbVehicles.length > 0 ? dbVehicles : defaultVehicles,
      reloadVehicles,
    }),
    [dbVehicles, reloadVehicles],
  );

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
}

export default VehicleProvider;
