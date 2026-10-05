import { Link } from "react-router-dom";

import getBrandLabel from "../../../utils/brandLabel";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import {
  getProductImageSrc,
  handleProductImageError,
} from "../../../utils/productImage";
import { getPromotionRuleLines } from "../../../utils/promotionCalc";

// کارت یک محصول در صفحه‌ی طرح‌های فروش: عکس، نام، برند و شرایط طرح
function PromotionCard({ product, language, t }) {
  const name = getProductNameLabel(product.name, language);

  return (
    <Link
      to={`/product/${product.id}`}
      className="border-2 border-amber-300 bg-amber-50 rounded-2xl p-5 hover:shadow-md transition block"
    >
      <div className="flex items-center gap-4">
        <img
          src={getProductImageSrc(product, 160)}
          alt={name}
          onError={handleProductImageError(product)}
          className="w-20 h-20 object-contain bg-white rounded-xl p-2"
        />

        <div>
          <h2 className="font-extrabold text-lg text-gray-900">{name}</h2>

          <p className="text-sm text-gray-600">
            {getBrandLabel(product.brand, language)}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        {getPromotionRuleLines(product.promotion, t).map((line, index) => (
          <p key={index} className="text-amber-800 font-bold text-sm">
            🎁 {line}
          </p>
        ))}
      </div>

      {product.promotion?.note && (
        <p className="mt-3 text-xs text-amber-700">{product.promotion.note}</p>
      )}
    </Link>
  );
}

export default PromotionCard;
