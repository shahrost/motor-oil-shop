import { useContext } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";
import getBrandLabel from "../../utils/brandLabel";
import getImageUrl from "../../utils/getImageUrl";
import {
  hasActivePromotion,
  getPromotionRuleLines,
} from "../../utils/promotionCalc";

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
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="border-2 border-amber-300 bg-amber-50 rounded-2xl p-5 hover:shadow-md transition block"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getImageUrl(product.image?.main)}
                  alt={product.name}
                  className="w-20 h-20 object-contain bg-white rounded-xl p-2"
                />

                <div>
                  <h2 className="font-extrabold text-lg text-gray-900">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-600">
                    {getBrandLabel(product.brand, language)}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                {getPromotionRuleLines(product.promotion, t).map(
                  (line, index) => (
                    <p key={index} className="text-amber-800 font-bold text-sm">
                      🎁 {line}
                    </p>
                  ),
                )}
              </div>

              {product.promotion?.note && (
                <p className="mt-3 text-xs text-amber-700">
                  {product.promotion.note}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Promotions;
