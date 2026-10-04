import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { ProductContext, VehicleContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";
import getRecommendedOils from "../../utils/vehicleOils";
import ProductCard from "../ProductCard";
import VehicleImage from "./VehicleImage";

function VehicleDetail() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { vehicles } = useContext(VehicleContext);
  const { language, t } = useContext(LanguageContext);

  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("vehicles.notFoundVehicle")}
      </p>
    );
  }

  const en = language === "en";
  const name = en ? vehicle.nameEn || vehicle.name : vehicle.name;
  const { main: oils, alt: altOils } = getRecommendedOils(vehicle, products);

  const specs = [
    [t("common.brand"), en ? vehicle.brandEn || vehicle.brand : vehicle.brand],
    [t("vehicles.years"), en ? vehicle.yearsEn || vehicle.years : vehicle.years],
    [
      t("vehicles.engine"),
      en ? vehicle.engineEn || vehicle.engine : vehicle.engine,
    ],
    [
      t("vehicles.engineSize"),
      vehicle.engineSize && `${vehicle.engineSize} ${t("vehicles.liter")}`,
    ],
    [t("vehicles.fuel"), vehicle.fuel],
    [t("vehicles.gearbox"), vehicle.gearbox],
    [t("vehicles.body"), vehicle.body],
    [t("vehicles.status"), vehicle.status],
    [
      t("vehicles.oilCapacity"),
      vehicle.oilCapacity && `${vehicle.oilCapacity} ${t("vehicles.liter")}`,
    ],
    [t("vehicles.viscosity"), vehicle.viscosities.join(" / ")],
    [t("vehicles.altViscosity"), (vehicle.altViscosities || []).join(" / ")],
    [t("vehicles.api"), vehicle.api],
    [
      t("vehicles.changeInterval"),
      vehicle.interval && `${vehicle.interval} ${t("vehicles.km")}`,
    ],
  ].filter(([, value]) => value && String(value).trim());

  return (
    <section className="px-5 mt-8 max-w-7xl mx-auto">
      <Link
        to={`/vehicles/${encodeURIComponent(vehicle.brand)}`}
        className="text-yellow-700 hover:text-yellow-800 font-bold text-sm"
      >
        ← {t("vehicles.back")}
      </Link>

      <div className="mt-4 max-w-md mx-auto border-2 border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <VehicleImage vehicle={vehicle} name={name} className="w-full h-48" />

        <h1 className="mt-3 text-xl font-extrabold text-gray-900 text-center">
          {name}
        </h1>

        <h2 className="mt-4 mb-2 text-sm font-bold text-gray-500">
          {t("vehicles.specs")}
        </h2>

        <div className="text-sm font-bold text-gray-700 space-y-1">
          {specs.map(([label, value]) => (
            <p key={label}>
              <span className="text-gray-500">{label}</span> {value}
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

      {altOils.length > 0 && (
        <>
          <h2 className="text-2xl font-extrabold text-center mt-10">
            {t("vehicles.alternativeOils")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 mt-6">
            {altOils.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default VehicleDetail;
