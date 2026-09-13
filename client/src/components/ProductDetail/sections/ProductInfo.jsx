import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import getBrandLabel from "../../../utils/brandLabel";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import LanguageContext from "../../../context/LanguageContext";
import {
  hasActivePromotion,
  getPromotionRuleLines,
  calcPromotionGift,
} from "../../../utils/promotionCalc";
import { getProductPrice } from "../../../utils/productPrice";
import PromotionBadge from "../../common/PromotionBadge";

function ProductInfo({
  product,
  quantity,
  setQuantity,
  orderType,
  setOrderType,
  paymentType,
  setPaymentType,
}) {
  const { language, t } = useContext(LanguageContext);

  const promoActive = hasActivePromotion(product.promotion);
  const giftQty = calcPromotionGift(
    product.promotion,
    orderType,
    quantity,
    paymentType,
  );

  return (
    <div>
      {promoActive && <PromotionBadge className="mb-3" />}

      <h1 className="text-3xl font-extrabold text-black">
        {getProductNameLabel(product.name, language)}
      </h1>

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

        <div className="flex items-center gap-2">
          <b className="text-green-700 shrink-0">{t("common.orderUnitLabel")}</b>

          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="border rounded-lg p-1 bg-white text-black"
          >
            <option value="number">{t("common.orderUnit.number")}</option>
            <option value="carton">{t("common.orderUnit.carton")}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <b className="text-green-700 shrink-0">{t("common.quantity")}</b>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-24 border rounded-lg p-1 text-black"
          />
        </div>

        <div className="flex items-center gap-2">
          <b className="text-green-700 shrink-0">{t("common.payment")}</b>

          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="border rounded-lg p-1 bg-white text-black"
          >
            <option value="cash">💵 {t("common.paymentType.cash")}</option>
            <option value="check">📝 {t("common.paymentType.check")}</option>
          </select>
        </div>

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

      {giftQty > 0 && (
        <div className="mt-5 bg-amber-50 border border-amber-300 rounded-2xl p-5 text-center">
          <p className="font-bold text-amber-800">
            🎁 {t("common.promotion.giftEarned")} {giftQty}{" "}
            {t("common.orderUnit.carton")}
          </p>
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
