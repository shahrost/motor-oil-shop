export function getProductPrice(product, paymentType) {
  if (paymentType === "check") {
    return Number(product?.priceCheck || product?.price || 0);
  }

  return Number(product?.price || 0);
}

// قیمت روش پرداخت خالی یا صفر یعنی «برای قیمت تماس بگیرید» و افزودن به سبد بسته‌ست
export function hasProductPrice(product, paymentType) {
  return getProductPrice(product, paymentType) > 0;
}

// روش پرداخت بی‌قیمت فقط وقتی غیرفعال می‌شه که روش دیگه قیمت داشته باشه
export function isPaymentTypeDisabled(product, paymentType) {
  if (!product || hasProductPrice(product, paymentType)) return false;

  return hasProductPrice(product, "cash") || hasProductPrice(product, "check");
}

// روش انتخاب‌شده اگه قیمت نداره و روش دیگه داره، روش دارای قیمت جاش حساب می‌شه
export function resolvePaymentType(product, paymentType) {
  if (!isPaymentTypeDisabled(product, paymentType)) return paymentType;

  return paymentType === "check" ? "cash" : "check";
}

// قیمت نمایشی بر اساس واحد خرید: «کارتن» = قیمت عددی × تعداد در کارتن
export function getUnitTotalPrice(product, paymentType, orderType) {
  const price = getProductPrice(product, paymentType);

  return orderType === "carton" ? price * Number(product?.cartonCount || 1) : price;
}

export default getProductPrice;
