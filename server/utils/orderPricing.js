// محاسبه‌ی قیمت سفارش سمت سرور؛ همون قاعده‌های کلاینت (client/src/utils/productPrice.js،
// cartItemCalc.js و promotionCalc.js) تا مبلغ ثبت‌شده به عددی که مرورگر فرستاده وابسته نباشه

// قیمت هر عدد با روش پرداخت؛ چکی خالی ← قیمت نقدی (مثل سایت)
function getUnitPrice(product, paymentType) {
  if (product.salesClosed || product.isActive === false) return 0;
  if (paymentType === "check") {
    return Number(product.priceCheck || product.price || 0);
  }

  return Number(product.price || 0);
}

// تعداد واقعی (عدد): کارتنی × تعداد در کارتن
function getUnitCount(product, orderType, quantity) {
  return orderType === "carton" ? quantity * Number(product.cartonCount || 1) : quantity;
}

const { calcPromotionGift, calcPromotionGiftDetails } = require("./promotionGift");

module.exports = {
  getUnitPrice,
  getUnitCount,
  calcPromotionGift,
  calcPromotionGiftDetails,
};
