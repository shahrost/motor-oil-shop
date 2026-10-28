import { Gift } from "lucide-react";
import {
  hasActivePromotion,
  getPromotionRuleLines,
  calcPromotionGift,
} from "../../../utils/promotionCalc";
import GiftBadge from "../../common/GiftBadge";

// شرایط طرح فروش محصول و هدیه‌ای که با انتخاب فعلی خریدار تعلق می‌گیره؛
// id="promotion-info": نشان «طرح فروش ویژه» بالای اسم (ProductSpecs) به اینجا اسکرول می‌کنه
function PromotionInfo({ product, orderType, quantity, paymentType, t }) {
  const giftQty = calcPromotionGift(product.promotion, orderType, quantity, paymentType);

  return (
    <>
      {hasActivePromotion(product.promotion) && (
        <div id="promotion-info" className="scroll-mt-28 mt-6 bg-amber-50 border border-amber-300 rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-3 text-amber-800 flex items-center gap-2">
            <Gift /> {t("common.promotion.badge")}
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

      <GiftBadge giftQty={giftQty} className="mt-5 rounded-2xl p-5" />
    </>
  );
}

export default PromotionInfo;
