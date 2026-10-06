import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import useVehicleBrandModels from "./hooks/useVehicleBrandModels";
import VehicleCard from "./VehicleCard";

// مدل‌های یک برند خودرو (با جستجو)؛ هر مدل به صفحه‌ی روانکار و فیلترش می‌ره
function VehicleBrand() {
  const { language, t } = useContext(LanguageContext);
  const { first, search, setSearch, filtered } = useVehicleBrandModels();

  if (!first) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("vehicles.notFoundBrand")}
      </p>
    );
  }

  return (
    <section className="px-5 mt-8 max-w-7xl mx-auto">
      <Link to="/vehicles" className="text-yellow-700 hover:text-yellow-800 font-bold text-sm">
        ← {t("vehicles.back")}
      </Link>

      <h1 className="text-3xl font-extrabold text-center mt-4">
        {language === "en" ? first.brandEn || first.brand : first.brand}
      </h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("vehicles.searchPlaceholder")}
        className="block w-full max-w-md mx-auto mt-6 border-2 border-gray-200 rounded-xl p-3 bg-white text-black"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
        {filtered.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-red-500 mt-10 font-bold">
          {t("vehicles.notFoundModels")}
        </p>
      )}
    </section>
  );
}

export default VehicleBrand;
