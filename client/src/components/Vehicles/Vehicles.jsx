import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import { vehicleBrands, getVehiclesByBrand } from "../../data/vehicles";

function Vehicles() {
  const { language, t } = useContext(LanguageContext);

  return (
    <section className="px-5 mt-8">
      <h1 className="text-3xl font-extrabold text-center">
        {t("vehicles.title")}
      </h1>

      <p className="text-center mt-3 text-gray-600">{t("vehicles.subtitle")}</p>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {vehicleBrands.map((brand) => {
          const label = language === "en" ? brand.nameEn : brand.name;
          const count = getVehiclesByBrand(brand.key).length;

          return (
            <Link
              key={brand.key}
              to={`/vehicles/${brand.key}`}
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
                {count} {t("vehicles.modelsCount")}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Vehicles;
