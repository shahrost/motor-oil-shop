import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import useViscosityProducts from "./hooks/useViscosityProducts";
import { ViscosityProductsList } from "./sections";
import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";

function ViscosityProducts() {
  const { t } = useContext(LanguageContext);
  const { viscosity, filteredProducts, loading } = useViscosityProducts();
  usePageMeta(
    `${t("viscosityProducts.titlePrefix")} ${viscosity}`,
    t("meta.viscosityProducts").replace("{name}", viscosity),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/viscosity"
        className="inline-flex items-center gap-1 mb-6 font-bold text-yellow-700 hover:text-yellow-800"
      >
        <ArrowLeft className="rtl:rotate-180" /> {t("viscosityProducts.back")}
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          {t("viscosityProducts.titlePrefix")} {viscosity}
        </h1>

        <p className="text-center mt-4 text-gray-600">
          {filteredProducts.length} {t("viscosityProducts.countText")}{" "}
          {viscosity} {t("common.available")}
        </p>

        <ViscosityProductsList products={filteredProducts} loading={loading} />
      </div>
    </div>
  );
}

export default ViscosityProducts;
