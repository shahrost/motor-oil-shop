import { useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { ProductContext } from "../../../context";
import defaultVehicles from "../../../data/vehicles";
import { fetchVehicleById } from "../../../services/vehicleService";
import getVehicleParts, { VEHICLE_PARTS } from "../../../utils/vehicleParts";
import useCachedLoad from "./useCachedLoad";

// خودروی صفحه، محصولات هر دسته‌اش و دسته‌ی انتخاب‌شده. دسته توی آدرس
// (?part=filter) نگه داشته می‌شه تا لینکش قابل اشتراک باشه؛ پیش‌فرض روغن موتور.
// فقط همین خودرو از سرور گرفته می‌شه؛ اگه نبود از دیتای پیش‌فرض.
function useVehicleDetail() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const loaded = useCachedLoad(fetchVehicleById, id);
  const [searchParams, setSearchParams] = useSearchParams();

  const vehicle =
    loaded === undefined
      ? undefined
      : loaded || defaultVehicles.find((v) => v.id === id) || null;

  const partParam = searchParams.get("part");
  const selected = VEHICLE_PARTS.some((p) => p.key === partParam)
    ? partParam
    : "oil";

  const selectPart = (key) =>
    setSearchParams(key === "oil" ? {} : { part: key }, { replace: true });

  return {
    loading: loaded === undefined,
    vehicle,
    parts: vehicle ? getVehicleParts(vehicle, products) : null,
    selected,
    selectPart,
  };
}

export default useVehicleDetail;
