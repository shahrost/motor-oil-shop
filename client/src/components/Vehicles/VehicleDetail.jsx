import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { ProductContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";
import { getVehicleById, getVehicleBrand } from "../../data/vehicles";
import getRecommendedOils from "../../utils/vehicleOils";
import ProductCard from "../ProductCard";
import VehicleImage from "./VehicleImage";

function VehicleDetail() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { language, t } = useContext(LanguageContext);

  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("vehicles.notFoundVehicle")}
      </p>
    );
  }

  const en = language === "en";
  const name = en ? vehicle.nameEn : vehicle.name;
  const brand = getVehicleBrand(vehicle.brand);
  const oils = getRecommendedOils(vehicle, products);

  const specs = [
    [t("common.brand"), en ? brand?.nameEn : brand?.name],
    [t("vehicles.years"), en ? vehicle.yearsEn : vehicle.years],
    [t("vehicles.engine"), en ? vehicle.engineEn : vehicle.engine],
    [
      t("vehicles.oilCapacity"),
      `${vehicle.oilCapacity} ${t("vehicles.liter")}`,
    ],
    [t("vehicles.viscosity"), vehicle.viscosities.join(" / ")],
    [t("vehicles.api"), vehicle.api],
    [t("vehicles.changeInterval"), `${vehicle.interval} ${t("vehicles.km")}`],
  ];

  return (
    <section className="px-5 mt-8 max-w-7xl mx-auto">
      <Link
        to={`/vehicles/${vehicle.brand}`}
        className="text-green-700 font-bold text-sm"
      >
        ← {t("vehicles.back")}
      </Link>

      <div className="mt-4 max-w-md mx-auto border-2 border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <VehicleImage vehicle={vehicle} name={name} className="w-full h-48" />

        <h1 className="mt-3 text-xl font-extrabold text-gray-900 text-center">
          {name}
        </h1>

        <h2 className="mt-4 mb-2 text-sm font-bold text-green-700">
          {t("vehicles.specs")}
        </h2>

        <div className="text-sm font-bold text-gray-700 space-y-1">
          {specs.map(([label, value]) => (
            <p key={label}>
              <span className="text-green-700">{label}</span> {value}
            </p>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-center mt-10">
        {t("vehicles.recommendedOils")}
      </h2>

      {oils.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 mt-6">
          {oils.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500 mt-6 font-bold">
          {t("vehicles.noOils")}
        </p>
      )}
    </section>
  );
}

export default VehicleDetail;
