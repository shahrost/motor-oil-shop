import { useContext, useMemo } from "react";

import { VehicleContext } from "../context";
import { getVehicleMenuGroups } from "../utils/vehicleMenuGroups";

// گروه‌بندی دوبخشی خودروها (داخلی / خارجی) + تابع شروع دریافت لیست برای منوی هدر
function useVehicleMenuGroups() {
  const { vehicles, requestVehicles } = useContext(VehicleContext);

  const groups = useMemo(() => getVehicleMenuGroups(vehicles), [vehicles]);

  return { ...groups, requestVehicles };
}

export default useVehicleMenuGroups;
