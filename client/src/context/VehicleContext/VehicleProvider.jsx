import { useMemo } from "react";

import VehicleContext from "./VehicleContext";
import defaultVehicles from "../../data/vehicles";
import { clearVehicleDataCache } from "../../services/vehicleDataCache";

// صفحه‌های خودرو داده‌ی سبک خودشون رو مستقیم می‌گیرن (برندها، مدل‌های یک برند، یک
// خودرو — Vehicles/hooks). لیست کامل خودروها (با ده‌ها هزار لینک محصول) دیگه گرفته
// نمی‌شه؛ vehicles فقط دیتای پیش‌فرض برای وقتیه که سرور برندی برنگردونه.
// reloadVehicles (بعد از ایمپورت ادمین) کش صفحه‌های خودرو رو خالی می‌کنه.
function VehicleProvider({ children }) {
  const value = useMemo(
    () => ({
      vehicles: defaultVehicles,
      reloadVehicles: clearVehicleDataCache,
    }),
    [],
  );

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
}

export default VehicleProvider;
