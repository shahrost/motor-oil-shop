import { useContext, useEffect, useMemo, useState } from "react";

import { VehicleContext } from "../../../context";
import { fetchVehicleBrands } from "../../../services/vehicleService";
import { getVehicleDataCache } from "../../../services/vehicleDataCache";
import { getVehicleBrands } from "../../../utils/vehicleBrands";

// برندها بین بازدیدها در کش مشترک صفحه‌های خودرو نگه داشته می‌شن
const KEY = "all";

// برندهای خودرو (هر برند یک بار) برای صفحه‌ی «خودروها»؛ تا وقتی از سرور نیومده null.
// برندها جدا و سبک از سرور گرفته می‌شن (نه از لیست کامل خودروها)؛ اگه سرور
// خالی یا در دسترس نبود، از دیتای پیش‌فرض خودروها ساخته می‌شن.
function useVehicleBrands() {
  const { vehicles } = useContext(VehicleContext);
  const cache = getVehicleDataCache(fetchVehicleBrands);
  const [brands, setBrands] = useState(() => cache.get(KEY) || null);

  useEffect(() => {
    if (cache.has(KEY)) return;

    let cancelled = false;

    async function loadBrands() {
      let loaded = [];

      try {
        loaded = await fetchVehicleBrands();
      } catch (error) {
        console.log("خطا در دریافت برندهای خودرو", error);
      }

      if (loaded.length > 0) cache.set(KEY, loaded);

      if (!cancelled) setBrands(loaded);
    }

    loadBrands();

    return () => {
      cancelled = true;
    };
  }, [cache]);

  return useMemo(() => {
    if (brands === null) return null;

    return brands.length > 0 ? brands : getVehicleBrands(vehicles);
  }, [brands, vehicles]);
}

export default useVehicleBrands;
