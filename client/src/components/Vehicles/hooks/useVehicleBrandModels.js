import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { VehicleContext } from "../../../context";
import { searchVehicles } from "../../../utils/vehicleBrands";

// مدل‌های برندِ آدرس (/vehicles/:brand) + جستجوی مدل
function useVehicleBrandModels() {
  const { brand: brandName } = useParams();
  const { vehicles } = useContext(VehicleContext);
  const [search, setSearch] = useState("");

  const brandVehicles = useMemo(
    () => vehicles.filter((vehicle) => vehicle.brand === brandName),
    [vehicles, brandName],
  );

  const filtered = useMemo(
    () => searchVehicles(brandVehicles, search),
    [brandVehicles, search],
  );

  return { first: brandVehicles[0], search, setSearch, filtered };
}

export default useVehicleBrandModels;
