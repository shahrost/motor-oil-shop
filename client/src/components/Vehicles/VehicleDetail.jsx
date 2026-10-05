import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { ProductContext, VehicleContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";
import getRecommendedOils from "../../utils/vehicleOils";
import buildVehicleSpecs from "./helpers/vehicleSpecs";
import VehicleSpecsCard from "./sections/VehicleSpecsCard";
import OilGrid from "./sections/OilGrid";

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

  const name = language === "en" ? vehicle.nameEn || vehicle.name : vehicle.name;
  const { main: oils, alt: altOils } = getRecommendedOils(vehicle, products);

  return (
    <section className="px-5 mt-8 max-w-7xl mx-auto">
      <Link
        to={`/vehicles/${encodeURIComponent(vehicle.brand)}`}
        className="text-yellow-700 hover:text-yellow-800 font-bold text-sm"
      >
        ← {t("vehicles.back")}
      </Link>

      <VehicleSpecsCard
        vehicle={vehicle}
        name={name}
        specs={buildVehicleSpecs(vehicle, language, t)}
        t={t}
      />

      <h2 className="text-2xl font-extrabold text-center mt-10">
        {t("vehicles.recommendedOils")}
      </h2>

      {oils.length > 0 ? (
        <OilGrid products={oils} />
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

          <OilGrid products={altOils} />
        </>
      )}
    </section>
  );
}

export default VehicleDetail;
