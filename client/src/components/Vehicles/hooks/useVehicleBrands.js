import { useContext, useMemo } from "react";

import { VehicleContext } from "../../../context";
import { getVehicleBrands } from "../../../utils/vehicleBrands";

// برندهای خودرو (هر برند یک بار) برای صفحه‌ی «خودروهای من»
function useVehicleBrands() {
  const { vehicles } = useContext(VehicleContext);

  return useMemo(() => getVehicleBrands(vehicles), [vehicles]);
}

export default useVehicleBrands;
