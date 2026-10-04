import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { VehicleContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";
import VehicleCard from "./VehicleCard";

function VehicleBrand() {
  const { brand: brandName } = useParams();
  const { language, t } = useContext(LanguageContext);
  const { vehicles } = useContext(VehicleContext);
  const [search, setSearch] = useState("");

  const brandVehicles = vehicles.filter((v) => v.brand === brandName);
  const first = brandVehicles[0];

  if (!first) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("vehicles.notFoundBrand")}
      </p>
    );
  }

  const query = search.trim().toLowerCase();

  const filtered = brandVehicles.filter(
    (vehicle) =>
      !query ||
      vehicle.name.toLowerCase().includes(query) ||
      (vehicle.nameEn || "").toLowerCase().includes(query),
  );

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
