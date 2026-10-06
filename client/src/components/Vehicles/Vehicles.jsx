import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import useVehicleMenuGroups from "../../hooks/useVehicleMenuGroups";
import VehicleBrandCard from "./sections/VehicleBrandCard";

const GRID_CLASS = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4";

// صفحه‌ی خودروها: خودروسازان داخلی ← برندها، و برندهای خارجی
function Vehicles() {
  const { language, t } = useContext(LanguageContext);
  const { domestic, foreign } = useVehicleMenuGroups();

  return (
    <section className="px-5 mt-8">
      <h1 className="text-3xl font-extrabold text-center">
        {t("vehicles.title")}
      </h1>

      <p className="text-center mt-3 text-gray-600">{t("vehicles.subtitle")}</p>

      <div className="max-w-7xl mx-auto">
        {domestic.length > 0 && (
          <>
            <h2 className="text-2xl font-extrabold mt-10">
              {t("vehicles.domesticMakers")}
            </h2>

            {domestic.map((maker) => (
              <div key={maker.slug} className="mt-6">
                <h3 className="text-lg font-bold text-yellow-700">
                  {language === "en" ? maker.labelEn : maker.label}
                </h3>

                <div className={GRID_CLASS}>
                  {maker.brands.map((brand) => (
                    <VehicleBrandCard
                      key={brand.name}
                      brand={brand}
                      makerSlug={maker.slug}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {foreign.length > 0 && (
          <>
            <h2 className="text-2xl font-extrabold mt-12">
              {t("vehicles.foreignBrands")}
            </h2>

            <div className={GRID_CLASS}>
              {foreign.map((brand) => (
                <VehicleBrandCard key={brand.name} brand={brand} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Vehicles;
