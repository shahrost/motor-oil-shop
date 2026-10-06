import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../context/LanguageContext";
import { vehicleBrandPath } from "../../../utils/vehicleMenuGroups";

// کارت یک برند خودرو توی صفحه‌ی «خودروها»
function VehicleBrandCard({ brand, makerSlug }) {
  const { language, t } = useContext(LanguageContext);

  const label = language === "en" ? brand.nameEn : brand.name;

  return (
    <Link
      to={vehicleBrandPath(brand.name, makerSlug)}
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-6
        text-center
        hover:shadow-xl
        hover:-translate-y-1
        transition
      "
    >
      <div className="h-24 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center font-extrabold text-gray-500 text-xl">
          {label.slice(0, 1)}
        </div>
      </div>

      <h3 className="font-bold mt-4">{label}</h3>

      <p className="text-sm text-gray-500 mt-1">
        {brand.count} {t("vehicles.modelsCount")}
      </p>
    </Link>
  );
}

export default VehicleBrandCard;
