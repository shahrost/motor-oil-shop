import { useContext, useEffect, useMemo, useState } from "react";

import { VehicleContext } from "../../../context";
import { fetchVehicleBrands } from "../../../services/vehicleService";
import { getVehicleBrands } from "../../../utils/vehicleBrands";

// برندها بین بازدیدها نگه داشته می‌شن تا برگشت به صفحه فوری باشه
let cachedBrands = null;

// برندهای خودرو (هر برند یک بار) برای صفحه‌ی «خودروها»؛ تا وقتی از سرور نیومده null.
// برندها جدا و سبک از سرور گرفته می‌شن (نه از لیست کامل خودروها)؛ اگه سرور
// خالی یا در دسترس نبود، از دیتای پیش‌فرض خودروها ساخته می‌شن.
function useVehicleBrands() {
  const { vehicles } = useContext(VehicleContext);
  const [brands, setBrands] = useState(cachedBrands);

  useEffect(() => {
    if (cachedBrands) return;

    let cancelled = false;

    async function loadBrands() {
      let loaded = [];

      try {
        loaded = await fetchVehicleBrands();
      } catch (error) {
        console.log("خطا در دریافت برندهای خودرو", error);
      }

      if (loaded.length > 0) cachedBrands = loaded;

      if (!cancelled) setBrands(loaded);
    }

    loadBrands();

    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => {
    if (brands === null) return null;

    return brands.length > 0 ? brands : getVehicleBrands(vehicles);
  }, [brands, vehicles]);
}

export default useVehicleBrands;
