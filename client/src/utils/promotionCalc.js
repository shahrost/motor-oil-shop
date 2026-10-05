// پله‌ی خرید هر نوع پرداخت؛ اگر جدا تعریف نشده باشد buyQty مشترک استفاده می‌شود
function getBuyQty(promotion, paymentType) {
  const specific =
    paymentType === "cash" ? promotion?.buyQtyCash : promotion?.buyQtyCheck;

  return Number(specific || promotion?.buyQty || 0);
}

function getGiftQty(promotion, paymentType) {
  return Number(
    (paymentType === "cash" ? promotion?.giftQtyCash : promotion?.giftQtyCheck) ||
      0,
  );
}

export function hasActivePromotion(promotion) {
  return Boolean(
    promotion?.isActive &&
      (getBuyQty(promotion, "cash") > 0 || getBuyQty(promotion, "check") > 0),
  );
}

export function calcPromotionGift(promotion, orderType, quantity, paymentType) {
  if (!hasActivePromotion(promotion) || orderType !== "carton") return 0;

  const qty = Number(quantity || 0);
  if (qty < Number(promotion.minQty || 0)) return 0;

  const buy = getBuyQty(promotion, paymentType);
  const giftPerStep = getGiftQty(promotion, paymentType);

  if (!buy || !giftPerStep) return 0;

  return Math.floor(qty / buy) * giftPerStep;
}

export function getPromotionRuleLines(promotion, t) {
  if (!hasActivePromotion(promotion)) return [];

  const cartonLabel = t("common.orderUnit.carton");
  const every = t("common.promotion.every");
  const gift = t("common.promotion.gift");

  const rule = (buy, giftQty) =>
    `${every} ${buy} ${cartonLabel}، ${giftQty} ${cartonLabel} ${gift}`;

  const cashBuy = getBuyQty(promotion, "cash");
  const checkBuy = getBuyQty(promotion, "check");
  const cashQty = getGiftQty(promotion, "cash");
  const checkQty = getGiftQty(promotion, "check");

  const lines = [];

  if (cashQty && cashQty === checkQty && cashBuy === checkBuy) {
    lines.push(rule(cashBuy, cashQty));
  } else {
    if (cashBuy && cashQty) {
      lines.push(`${t("common.paymentType.cash")}: ${rule(cashBuy, cashQty)}`);
    }

    if (checkBuy && checkQty) {
      lines.push(`${t("common.paymentType.check")}: ${rule(checkBuy, checkQty)}`);
    }
  }

  const minQty = Number(promotion.minQty || 0);
  if (minQty) {
    lines.push(`${t("common.promotion.minOrder")} ${minQty} ${cartonLabel}`);
  }

  return lines;
}
