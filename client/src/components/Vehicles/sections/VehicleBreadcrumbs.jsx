import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../context/LanguageContext";
import { vehicleBrandPath } from "../../../utils/vehicleBrands";

// مسیر بالای صفحه‌ی خودرو: خانه › خودروها › برند › نام خودرو
function VehicleBreadcrumbs({ vehicle, name }) {
  const { language, t } = useContext(LanguageContext);
  const brand = language === "en" ? vehicle.brandEn || vehicle.brand : vehicle.brand;

  const items = [
    { to: "/", label: t("nav.home") },
    { to: "/vehicles", label: t("nav.myVehicles") },
    { to: vehicleBrandPath(vehicle.brand), label: brand },
  ];

  return (
    <nav aria-label="breadcrumb" className="text-sm font-bold text-gray-500">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item) => (
          <li key={item.to} className="flex items-center gap-2">
            <Link to={item.to} className="hover:text-yellow-700 transition">
              {item.label}
            </Link>
            <span aria-hidden="true">›</span>
          </li>
        ))}

        <li aria-current="page" className="text-gray-900 line-clamp-1">
          {name}
        </li>
      </ol>
    </nav>
  );
}

export default VehicleBreadcrumbs;
