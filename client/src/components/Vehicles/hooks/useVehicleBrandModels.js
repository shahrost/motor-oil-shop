import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import defaultVehicles from "../../../data/vehicles";
import { fetchBrandVehicles } from "../../../services/vehicleService";
import { searchVehicles } from "../../../utils/vehicleBrands";
import useCachedLoad from "./useCachedLoad";

// مدل‌های برندِ آدرس (/vehicles/:brand) + جستجوی مدل. فقط مدل‌های همین برند از سرور
// گرفته می‌شن (نه لیست کامل خودروها)؛ اگه سرور چیزی نداشت یا در دسترس نبود از دیتای پیش‌فرض.
function useVehicleBrandModels() {
  const { brand: brandName } = useParams();
  const loaded = useCachedLoad(fetchBrandVehicles, brandName);
  const [search, setSearch] = useState("");

  const brandVehicles = useMemo(() => {
    if (loaded === undefined) return [];
    if (loaded && loaded.length > 0) return loaded;

    return defaultVehicles.filter((vehicle) => vehicle.brand === brandName);
  }, [loaded, brandName]);

  const filtered = useMemo(
    () => searchVehicles(brandVehicles, search),
    [brandVehicles, search],
  );

  return {
    loading: loaded === undefined,
    first: brandVehicles[0],
    search,
    setSearch,
    filtered,
  };
}

export default useVehicleBrandModels;
