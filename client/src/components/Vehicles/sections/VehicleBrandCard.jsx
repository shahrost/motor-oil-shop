import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../context/LanguageContext";
import { vehicleBrandPath } from "../../../utils/vehicleBrands";
import VehicleBrandLogo from "./VehicleBrandLogo";

// کارت یک برند خودرو توی صفحه‌ی «خودروهای من»
function VehicleBrandCard({ brand }) {
  const { language, t } = useContext(LanguageContext);

  const label = language === "en" ? brand.nameEn : brand.name;

  return (
    <Link
      to={vehicleBrandPath(brand.name)}
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
        <VehicleBrandLogo nameEn={brand.nameEn} label={label} />
      </div>

      <h3 className="font-bold mt-4">{label}</h3>

      <p className="text-sm text-gray-500 mt-1">
        {brand.count} {t("vehicles.modelsCount")}
      </p>
    </Link>
  );
}

export default VehicleBrandCard;
