import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import VehicleBrandCard from "./VehicleBrandCard";
import VehicleCard from "./VehicleCard";

// نتیجه‌ی جستجوی خودرو: برندهای هم‌نام (اگه بود) + کارت خودروها + «نمایش بیشتر»
function VehicleSearchResults({ loading, failed, matchedBrands, vehicles, total, onShowMore }) {
  const { t } = useContext(LanguageContext);

  if (failed) {
    return <p className="text-center text-red-500 mt-10 font-bold">{t("vehicles.searchError")}</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">{t("vehicles.loading")}</p>;
  }

  if (total === 0 && matchedBrands.length === 0) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">{t("vehicles.notFoundModels")}</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8">
      {matchedBrands.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {matchedBrands.map((brand) => (
            <VehicleBrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      )}

      {total > 0 && (
        <p className="text-sm font-bold text-gray-600 mb-3">
          {total} {t("vehicles.searchCount")}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {vehicles.length < total && (
        <button
          type="button"
          onClick={onShowMore}
          className="block mx-auto mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-6 py-2 rounded-xl"
        >
          {t("vehicles.showMore")}
        </button>
      )}
    </div>
  );
}

export default VehicleSearchResults;
