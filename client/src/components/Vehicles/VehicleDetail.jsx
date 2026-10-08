import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import useVehicleDetail from "./hooks/useVehicleDetail";
import buildVehicleSpecs from "./helpers/vehicleSpecs";
import VehicleSpecsCard from "./sections/VehicleSpecsCard";
import PartButtons from "./sections/PartButtons";
import PartProducts from "./sections/PartProducts";

function VehicleDetail() {
  const { language, t } = useContext(LanguageContext);
  const { loading, vehicle, parts, selected, selectPart } = useVehicleDetail();

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">{t("vehicles.loading")}</p>;
  }

  if (!vehicle) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("vehicles.notFoundVehicle")}
      </p>
    );
  }

  const name = language === "en" ? vehicle.nameEn || vehicle.name : vehicle.name;

  return (
    <section className="px-5 mt-8 max-w-7xl mx-auto">
      <Link
        to={`/vehicles/${encodeURIComponent(vehicle.brand)}`}
        className="text-yellow-700 hover:text-yellow-800 font-bold text-sm"
      >
        ← {t("vehicles.back")}
      </Link>

      <VehicleSpecsCard
        vehicle={vehicle}
        name={name}
        specs={buildVehicleSpecs(vehicle, language, t)}
        t={t}
      />

      <PartButtons
        parts={parts}
        selected={selected}
        onSelect={selectPart}
        t={t}
      />

      <PartProducts
        parts={parts}
        selected={selected}
        isElectric={(vehicle.fuel || "").trim() === "برقی"}
        t={t}
      />
    </section>
  );
}

export default VehicleDetail;
