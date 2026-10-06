import { useContext } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { ProductContext, VehicleContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";
import getVehicleParts, { VEHICLE_PARTS } from "../../utils/vehicleParts";
import buildVehicleSpecs from "./helpers/vehicleSpecs";
import VehicleSpecsCard from "./sections/VehicleSpecsCard";
import PartButtons from "./sections/PartButtons";
import OilGrid from "./sections/OilGrid";

function VehicleDetail() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { vehicles } = useContext(VehicleContext);
  const { language, t } = useContext(LanguageContext);

  // دسته‌ی انتخاب‌شده توی آدرس (?part=filter) تا لینکش قابل اشتراک باشه
  const [searchParams, setSearchParams] = useSearchParams();
  const partParam = searchParams.get("part");
  const selected = VEHICLE_PARTS.some((p) => p.key === partParam)
    ? partParam
    : "oil";

  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("vehicles.notFoundVehicle")}
      </p>
    );
  }

  const name = language === "en" ? vehicle.nameEn || vehicle.name : vehicle.name;
  const parts = getVehicleParts(vehicle, products);
  const isElectric = (vehicle.fuel || "").trim() === "برقی";

  const selectPart = (key) =>
    setSearchParams(key === "oil" ? {} : { part: key }, { replace: true });

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

      <PartButtons
        parts={parts}
        selected={selected}
        onSelect={selectPart}
        t={t}
      />

      <h2 className="text-2xl font-extrabold text-center mt-10">
        {selected === "oil"
          ? t("vehicles.recommendedOils")
          : `${t(`vehicles.parts.${selected}`)} ${t("vehicles.parts.forVehicle")}`}
      </h2>

      {selected === "oil" ? (
        <>
          {parts.oil.main.length > 0 ? (
            <OilGrid products={parts.oil.main} />
          ) : (
            <p
              className={`text-center mt-6 font-bold ${
                isElectric ? "text-gray-500" : "text-red-500"
              }`}
            >
              {isElectric ? t("vehicles.electricNoOil") : t("vehicles.noOils")}
            </p>
          )}

          {parts.oil.alt.length > 0 && (
            <>
              <h2 className="text-2xl font-extrabold text-center mt-10">
                {t("vehicles.alternativeOils")}
              </h2>

              <OilGrid products={parts.oil.alt} />
            </>
          )}
        </>
      ) : parts[selected].length > 0 ? (
        <OilGrid products={parts[selected]} />
      ) : (
        <p className="text-center mt-6 font-bold text-gray-500">
          {t("vehicles.parts.empty")}
        </p>
      )}
    </section>
  );
}

export default VehicleDetail;
