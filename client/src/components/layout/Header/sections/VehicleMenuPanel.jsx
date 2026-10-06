import { Link } from "react-router-dom";

import { vehicleBrandPath } from "../../../../utils/vehicleMenuGroups";

const BRAND_LINK_CLASS = "text-sm text-gray-300 hover:text-yellow-400 transition";

// محتوای زیرمنوی «خودروها»: خودروسازان داخلی ← برندها، و برندهای خارجی.
// مدل‌ها فقط داخل صفحه‌ی برند نشون داده می‌شن.
function VehicleMenuPanel({ t, language, domestic, foreign, onNavigate }) {
  const label = (item) => (language === "en" ? item.nameEn : item.name);

  return (
    <div className="flex flex-col gap-5 text-start">
      {domestic.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-gray-500 mb-3">
            {t("vehicles.domesticMakers")}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {domestic.map((maker) => (
              <div key={maker.slug}>
                <p className="font-bold text-yellow-400 text-sm mb-1">
                  {language === "en" ? maker.labelEn : maker.label}
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {maker.brands.map((brand) => (
                    <Link
                      key={brand.name}
                      to={vehicleBrandPath(brand.name, maker.slug)}
                      onClick={onNavigate}
                      className={BRAND_LINK_CLASS}
                    >
                      {label(brand)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {foreign.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-gray-500 mb-3">
            {t("vehicles.foreignBrands")}
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
            {foreign.map((brand) => (
              <Link
                key={brand.name}
                to={vehicleBrandPath(brand.name)}
                onClick={onNavigate}
                className={BRAND_LINK_CLASS}
              >
                {label(brand)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleMenuPanel;
