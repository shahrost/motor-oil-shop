import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import VehicleImage from "./VehicleImage";

function VehicleCard({ vehicle }) {
  const { language, t } = useContext(LanguageContext);
  const en = language === "en";

  const name = en ? vehicle.nameEn || vehicle.name : vehicle.name;

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
        hover:border-yellow-400
        transition
      "
    >
      <VehicleImage vehicle={vehicle} name={name} className="w-full h-32" />

      <h3 className="mt-3 text-sm font-bold text-gray-900 line-clamp-2">
        {name}
      </h3>

      <div className="mt-2 text-sm font-bold text-gray-700 space-y-1">
        <p className="line-clamp-1">
          <span className="text-gray-500">{t("common.brand")}</span>{" "}
          {en ? vehicle.brandEn || vehicle.brand : vehicle.brand}
        </p>

        <p className="line-clamp-1">
          <span className="text-gray-500">{t("vehicles.viscosity")}</span>{" "}
          {vehicle.viscosities.join(" / ")}
        </p>

        {vehicle.oilCapacity && (
          <p className="line-clamp-1">
            <span className="text-gray-500">{t("vehicles.oilCapacity")}</span>{" "}
            {vehicle.oilCapacity} {t("vehicles.liter")}
          </p>
        )}
      </div>

      <span className="mt-3 block w-full bg-yellow-400 text-gray-950 py-2 rounded-lg text-sm font-bold text-center">
        {t("vehicles.viewSpecs")}
      </span>
    </Link>
  );
}

export default VehicleCard;
