export function hasActivePromotion(promotion) {
  return Boolean(promotion?.isActive && Number(promotion?.buyQty) > 0);
}

export function calcPromotionGift(promotion, orderType, quantity, paymentType) {
  if (!hasActivePromotion(promotion) || orderType !== "carton") return 0;

  const giftPerStep =
    paymentType === "cash"
      ? Number(promotion.giftQtyCash || 0)
      : Number(promotion.giftQtyCheck || 0);

  if (!giftPerStep) return 0;

  const steps = Math.floor(Number(quantity || 0) / Number(promotion.buyQty));

  return steps * giftPerStep;
}

export function getPromotionRuleLines(promotion, t) {
  if (!hasActivePromotion(promotion)) return [];

  const buy = Number(promotion.buyQty);
  const cartonLabel = t("common.orderUnit.carton");
  const every = t("common.promotion.every");
  const gift = t("common.promotion.gift");

  const cashQty = Number(promotion.giftQtyCash || 0);
  const checkQty = Number(promotion.giftQtyCheck || 0);

  if (cashQty && cashQty === checkQty) {
    return [`${every} ${buy} ${cartonLabel}، ${cashQty} ${cartonLabel} ${gift}`];
  }

  const lines = [];

  if (cashQty) {
    lines.push(
      `${every} ${buy} ${cartonLabel} (${t("common.paymentType.cash")}): ${cashQty} ${cartonLabel} ${gift}`,
    );
  }

  if (checkQty) {
    lines.push(
      `${every} ${buy} ${cartonLabel} (${t("common.paymentType.check")}): ${checkQty} ${cartonLabel} ${gift}`,
    );
  }

  return lines;
}
