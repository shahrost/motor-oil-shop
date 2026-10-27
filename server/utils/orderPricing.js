// محاسبه‌ی قیمت سفارش سمت سرور؛ همون قاعده‌های کلاینت (client/src/utils/productPrice.js،
// cartItemCalc.js و promotionCalc.js) تا مبلغ ثبت‌شده به عددی که مرورگر فرستاده وابسته نباشه

// قیمت هر عدد با روش پرداخت؛ چکی خالی ← قیمت نقدی (مثل سایت)
function getUnitPrice(product, paymentType) {
  if (paymentType === "check") {
    return Number(product.priceCheck || product.price || 0);
  }

  return Number(product.price || 0);
}

// تعداد واقعی (عدد): کارتنی × تعداد در کارتن
function getUnitCount(product, orderType, quantity) {
  return orderType === "carton" ? quantity * Number(product.cartonCount || 1) : quantity;
}

function getBuyQty(promotion, paymentType) {
  const specific = paymentType === "cash" ? promotion?.buyQtyCash : promotion?.buyQtyCheck;

  return Number(specific || promotion?.buyQty || 0);
}

function getGiftQty(promotion, paymentType) {
  return Number(
    (paymentType === "cash" ? promotion?.giftQtyCash : promotion?.giftQtyCheck) || 0,
  );
}

// کارتن هدیه‌ی طرح فروش (فقط خرید کارتنی)
function calcPromotionGift(promotion, orderType, quantity, paymentType) {
  const active =
    promotion?.isActive &&
    (getBuyQty(promotion, "cash") > 0 || getBuyQty(promotion, "check") > 0);

  if (!active || orderType !== "carton") return 0;
  if (quantity < Number(promotion.minQty || 0)) return 0;

  const buy = getBuyQty(promotion, paymentType);
  const giftPerStep = getGiftQty(promotion, paymentType);

  if (!buy || !giftPerStep) return 0;

  return Math.floor(quantity / buy) * giftPerStep;
}

module.exports = {
  getUnitPrice,
  getUnitCount,
  calcPromotionGift,
};
