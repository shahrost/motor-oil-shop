import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import SelectedVehicleContext from "../../context/SelectedVehicleContext";
import VehicleReviews, { useVehicleReviews } from "../VehicleReviews";
import useVehicleDetail from "./hooks/useVehicleDetail";
import buildVehicleSpecs from "./helpers/vehicleSpecs";
import {
  VehicleBreadcrumbs,
  VehicleHero,
  PartButtons,
  PartProducts,
} from "./sections";

// صفحه‌ی یک خودرو: مسیر، عکس + مشخصات + اشتراک‌گذاری، نوار دسته‌ها و محصولات
// مناسب (نوار خاکستری تمام‌عرض)، امتیاز و نظرات کاربران
function VehicleDetail() {
  const { language, t } = useContext(LanguageContext);
  const { id, loading, vehicle, parts, selected, selectPart } = useVehicleDetail();
  const reviews = useVehicleReviews(id);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">{t("vehicles.loading")}</p>;
  }

  if (!vehicle) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("vehicles.notFoundVehicle")}
      </p>
    );
  }

  const name = language === "en" ? vehicle.nameEn || vehicle.name : vehicle.name;

  return (
    <>
      <section className="px-5 mt-8 max-w-7xl mx-auto">
        <VehicleBreadcrumbs vehicle={vehicle} name={name} />

        <VehicleHero
          vehicle={vehicle}
          name={name}
          specs={buildVehicleSpecs(vehicle, language, t)}
          summary={reviews.summary}
        />
      </section>

      <section className="mt-10 bg-gray-100 py-8">
        <div className="px-5 max-w-7xl mx-auto">
          <p className="text-center text-sm font-bold text-gray-600 mb-5">
            {t("vehicles.parts.pick")}
          </p>

          <PartButtons parts={parts} selected={selected} onSelect={selectPart} t={t} />

          {/* نام فارسی خودرو برای ردیف سفارش (پنل ادمین فارسیه) */}
          <SelectedVehicleContext.Provider value={vehicle.name || ""}>
            <PartProducts
              parts={parts}
              selected={selected}
              vehicleName={name}
              isElectric={(vehicle.fuel || "").trim() === "برقی"}
              t={t}
            />
          </SelectedVehicleContext.Provider>
        </div>
      </section>

      <div className="px-5 max-w-7xl mx-auto">
        {/* key: با رفتن به خودروی دیگه فرم امتیاز از نو شروع می‌شه */}
        <VehicleReviews key={vehicle.id} vehicleId={vehicle.id} reviews={reviews} />
      </div>
    </>
  );
}

export default VehicleDetail;
