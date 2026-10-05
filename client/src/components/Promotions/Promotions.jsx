import { useContext } from "react";

import { ProductContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";
import { hasActivePromotion } from "../../utils/promotionCalc";
import PromotionCard from "./sections/PromotionCard";

function Promotions() {
  const { products } = useContext(ProductContext);
  const { language, t } = useContext(LanguageContext);

  const promoProducts = products.filter((product) =>
    hasActivePromotion(product.promotion),
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-extrabold text-center">
        {t("promotions.title")}
      </h1>

      <p className="text-center mt-3 text-gray-600">
        {t("promotions.subtitle")}
      </p>

      {promoProducts.length === 0 ? (
        <p className="text-center text-red-500 mt-10 font-bold">
          {t("promotions.notFound")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          {promoProducts.map((product) => (
            <PromotionCard
              key={product.id}
              product={product}
              language={language}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Promotions;
