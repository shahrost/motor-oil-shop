import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import { getVehicleBrand } from "../../data/vehicles";
import VehicleImage from "./VehicleImage";

function VehicleCard({ vehicle }) {
  const { language, t } = useContext(LanguageContext);
  const en = language === "en";

  const name = en ? vehicle.nameEn : vehicle.name;
  const brand = getVehicleBrand(vehicle.brand);

  return (
    <Link
      to={`/vehicle/${vehicle.id}`}
      className="
        block
        border-2
        border-gray-200
        rounded-xl
        p-4
        bg-white
        shadow-sm
        hover:shadow-md
        hover:border-green-300
        transition
      "
    >
      <VehicleImage vehicle={vehicle} name={name} className="w-full h-32" />

      <h3 className="mt-3 text-sm font-bold text-gray-900 line-clamp-2">
        {name}
      </h3>

      <div className="mt-2 text-sm font-bold text-gray-700 space-y-1">
        <p className="line-clamp-1">
          <span className="text-green-700">{t("common.brand")}</span>{" "}
          {en ? brand?.nameEn : brand?.name}
        </p>

        <p className="line-clamp-1">
          <span className="text-green-700">{t("vehicles.viscosity")}</span>{" "}
          {vehicle.viscosities.join(" / ")}
        </p>

        <p className="line-clamp-1">
          <span className="text-green-700">{t("vehicles.oilCapacity")}</span>{" "}
          {vehicle.oilCapacity} {t("vehicles.liter")}
        </p>
      </div>

      <span className="mt-3 block w-full bg-green-600 text-white py-2 rounded-lg text-sm font-bold text-center">
        {t("vehicles.viewSpecs")}
      </span>
    </Link>
  );
}

export default VehicleCard;
