import { useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { ProductContext, VehicleContext } from "../../../context";
import getVehicleParts, { VEHICLE_PARTS } from "../../../utils/vehicleParts";

// خودروی صفحه، محصولات هر دسته‌اش و دسته‌ی انتخاب‌شده. دسته توی آدرس
// (?part=filter) نگه داشته می‌شه تا لینکش قابل اشتراک باشه؛ پیش‌فرض روغن موتور.
function useVehicleDetail() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { vehicles } = useContext(VehicleContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const vehicle = vehicles.find((v) => v.id === id);

  const partParam = searchParams.get("part");
  const selected = VEHICLE_PARTS.some((p) => p.key === partParam)
    ? partParam
    : "oil";

  const selectPart = (key) =>
    setSearchParams(key === "oil" ? {} : { part: key }, { replace: true });

  return {
    vehicle,
    parts: vehicle ? getVehicleParts(vehicle, products) : null,
    selected,
    selectPart,
  };
}

export default useVehicleDetail;
