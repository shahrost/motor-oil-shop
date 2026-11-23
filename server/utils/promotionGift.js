function getBuyQty(promotion, paymentType) {
  return Number((paymentType === "cash" ? promotion?.buyQtyCash : promotion?.buyQtyCheck) || promotion?.buyQty || 0);
}

function hasActivePromotion(promotion) {
  return Boolean(promotion?.isActive && (getBuyQty(promotion, "cash") > 0 || getBuyQty(promotion, "check") > 0));
}

// در طرح‌های پلکانی، زیر حدنصاب هدیه عددی و از حدنصاب به بالا هدیه کارتنی است.
function calcPromotionGiftDetails(promotion, orderType, quantity, paymentType) {
  const none = { giftQty: 0, giftUnit: "carton" };
  const qty = Number(quantity);
  if (!hasActivePromotion(promotion) || orderType !== "carton" || !Number.isSafeInteger(qty) || qty < 1 || qty < Number(promotion.minQty || 0)) return none;
  const buy = getBuyQty(promotion, paymentType);
  const gift = Number((paymentType === "cash" ? promotion.giftQtyCash : promotion.giftQtyCheck) || 0);
  if (!(buy > 0) || !(gift > 0)) return none;
  if (qty >= buy) return { giftQty: Math.floor(qty / buy) * gift, giftUnit: "carton" };

  const rules = paymentType === "check" ? promotion.belowThresholdRulesCheck : promotion.belowThresholdRulesCash;
  let remainder = qty;
  let giftQty = 0;
  for (const rule of [...(rules || [])].sort((a, b) => b.buyQty - a.buyQty)) {
    if (!(rule.buyQty > 0) || !(rule.giftQty > 0)) continue;
    giftQty += Math.floor(remainder / rule.buyQty) * rule.giftQty;
    remainder %= rule.buyQty;
  }
  return { giftQty, giftUnit: giftQty > 0 ? "number" : "carton" };
}

function calcPromotionGift(...args) {
  return calcPromotionGiftDetails(...args).giftQty;
}

module.exports = { getBuyQty, hasActivePromotion, calcPromotionGift, calcPromotionGiftDetails };
