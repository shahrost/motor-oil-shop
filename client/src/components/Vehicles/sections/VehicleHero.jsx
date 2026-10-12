import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import ShareButton from "../../common/ShareButton";
import VehicleBrandLogo from "./VehicleBrandLogo";
import VehicleImage from "./VehicleImage";
import VehicleRatingLink from "./VehicleRatingLink";

// بالای صفحه‌ی خودرو: عکس (یک ستون) + لوگوی برند، اشتراک‌گذاری، نام، امتیاز و
// شبکه‌ی مشخصات (ستون دیگر). specs = [[برچسب، مقدار]]
function VehicleHero({ vehicle, name, specs, summary }) {
  const { language, t } = useContext(LanguageContext);
  const brand = language === "en" ? vehicle.brandEn || vehicle.brand : vehicle.brand;

  return (
    <div className="mt-5 grid gap-6 md:grid-cols-2 md:items-center">
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm">
        <VehicleImage vehicle={vehicle} name={name} className="w-full h-52 sm:h-72" />
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="h-14 w-36 flex items-center">
            <VehicleBrandLogo nameEn={vehicle.brandEn} label={brand} imgClassName="max-h-14" />
          </div>

          <ShareButton text={`${name} — ${t("vehicles.shareText")}`} />
        </div>

        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900">{name}</h1>

        <VehicleRatingLink summary={summary} />

        <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm">
          {specs.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs font-bold text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm font-extrabold text-gray-900 break-words">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default VehicleHero;
