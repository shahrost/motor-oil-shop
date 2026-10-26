import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../context/LanguageContext";
import brands from "../../../data/brands";

// برندهای عرضه‌شده (همون لیست صفحه‌ی برندها)؛ هر لوگو به محصولات اون برند می‌ره
function AboutBrands() {
  const { language, t } = useContext(LanguageContext);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center">{t("about.brandsTitle")}</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-6">
        {brands.map((brand) => {
          const label = language === "en" ? brand.nameEn : brand.name;

          return (
            <Link
              key={brand.name}
              to={`/brand/${brand.name}`}
              title={label}
              className="bg-gray-100 rounded-xl p-3 flex flex-col items-center gap-2 hover:shadow-md transition"
            >
              <div className="h-12 flex items-center justify-center">
                {brand.image && (
                  <img src={brand.image} alt="" className="max-h-12 object-contain" />
                )}
              </div>

              <span className="text-xs font-bold text-gray-700 text-center">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default AboutBrands;
