import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import useVehicleBrands from "./hooks/useVehicleBrands";
import VehicleBrandCard from "./sections/VehicleBrandCard";

// صفحه‌ی «خودروهای من» (مقصد مشترک کارت صفحه‌ی اصلی و منوی هدر): فقط برندها
function Vehicles() {
  const { t } = useContext(LanguageContext);
  const brands = useVehicleBrands();

  return (
    <section className="px-5 mt-8">
      <h1 className="text-3xl font-extrabold text-center">
        {t("vehicles.title")}
      </h1>

      <p className="text-center mt-3 text-gray-600">{t("vehicles.subtitle")}</p>

      {brands === null ? (
        <p className="text-center text-gray-500 mt-10">{t("vehicles.loading")}</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {brands.map((brand) => (
            <VehicleBrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Vehicles;
