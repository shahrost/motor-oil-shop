import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../context/LanguageContext";
import useHomeBrands from "../hooks/useHomeBrands";
import HomeSectionHeader from "./HomeSectionHeader";

// نوار برندها: روی موبایل ردیف افقی قابل‌اسکرول، از lg شبکه‌ای؛ هر لوگو به صفحه‌ی همون برند.
// کارت‌ها هم‌اندازه. در حالت شب کارت تیره‌ست و لوگو روی یک پلاک روشن (bg-white/90) تا خوانا بمونه
function BrandStrip() {
  const { language, t } = useContext(LanguageContext);
  const brands = useHomeBrands();

  if (brands.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <HomeSectionHeader title={t("about.brandsTitle")} to="/brands" linkLabel={t("home.featured.viewAll")} />

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
        {brands.map((brand) => {
          const label = language === "en" ? brand.nameEn : brand.name;

          return (
            <Link
              key={brand.name}
              to={`/brand/${brand.name}`}
              title={label}
              aria-label={label}
              className="flex-none w-28 h-20 lg:w-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-2.5 flex items-center justify-center hover:shadow-md hover:border-yellow-400 hover:-translate-y-0.5 transition"
            >
              <span className="w-full h-full flex items-center justify-center rounded-xl dark:bg-white/90 dark:p-1">
                <img
                  src={brand.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 max-w-full object-contain"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BrandStrip;
