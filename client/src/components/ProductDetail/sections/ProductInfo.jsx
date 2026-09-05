import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import getBrandLabel from "../../../utils/brandLabel";
import LanguageContext from "../../../context/LanguageContext";
import {
  hasActivePromotion,
  getPromotionRuleLines,
} from "../../../utils/promotionCalc";
import { getProductPrice } from "../../../utils/productPrice";
import PromotionBadge from "../../common/PromotionBadge";

function ProductInfo({ product, paymentType }) {
  const { language, t } = useContext(LanguageContext);

  const promoActive = hasActivePromotion(product.promotion);

  return (
    <div>
      {promoActive && <PromotionBadge className="mb-3" />}

      <h1 className="text-3xl font-extrabold text-black">{product.name}</h1>

      <div className="mt-6 space-y-3 text-black">
        <p>
          <b className="text-green-700">{t("common.brand")}</b>{" "}
          {getBrandLabel(product.brand, language)}
        </p>

        <p>
          <b className="text-green-700">{t("common.viscosity")}</b> {product.viscosity}
        </p>

        <p>
          <b className="text-green-700">{t("common.volume")}</b> {product.volume}
        </p>

        <p>
          <b className="text-green-700">API:</b> {product.api}
        </p>

        <p>
          <b className="text-green-700">ACEA:</b> {product.acea}
        </p>

        <p>
          <b className="text-green-700">{t("productDetail.oilType")}</b>{" "}
          {product.oilType}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-4xl font-extrabold text-green-700">
          {formatPrice(getProductPrice(product, paymentType), language)}
        </p>

        <span className="inline-block mt-3 bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
          🟢 {t("productDetail.inStock")}
        </span>
      </div>

      {promoActive && (
        <div className="mt-6 bg-amber-50 border border-amber-300 rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-3 text-amber-800">
            🎁 {t("common.promotion.badge")}
          </h3>

          <div className="space-y-1">
            {getPromotionRuleLines(product.promotion, t).map((line, i) => (
              <p key={i} className="text-amber-800 font-bold">
                {line}
              </p>
            ))}
          </div>

          {product.promotion?.note && (
            <p className="mt-3 text-sm text-amber-700">
              {product.promotion.note}
            </p>
          )}
        </div>
      )}

      {product.description && (
        <div className="mt-6 bg-gray-50 rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-3">{t("productDetail.description")}</h3>

          <p className="leading-8 text-gray-700 whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
