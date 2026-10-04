import {
  hasActivePromotion,
  getPromotionRuleLines,
  calcPromotionGift,
} from "../../../utils/promotionCalc";

// شرایط طرح فروش محصول و هدیه‌ای که با انتخاب فعلی خریدار تعلق می‌گیره
function PromotionInfo({ product, orderType, quantity, paymentType, t }) {
  const giftQty = calcPromotionGift(product.promotion, orderType, quantity, paymentType);

  return (
    <>
      {hasActivePromotion(product.promotion) && (
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
            <p className="mt-3 text-sm text-amber-700">{product.promotion.note}</p>
          )}
        </div>
      )}

      {giftQty > 0 && (
        <div className="mt-5 bg-amber-50 border border-amber-300 rounded-2xl p-5 text-center">
          <p className="font-bold text-amber-800">
            🎁 {t("common.promotion.giftEarned")} {giftQty} {t("common.orderUnit.carton")}
          </p>
        </div>
      )}
    </>
  );
}

export default PromotionInfo;
