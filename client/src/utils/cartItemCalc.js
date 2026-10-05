import { getProductPrice } from "./productPrice";

// تعداد واقعی (عدد) یک ردیف سبد: کارتنی × تعداد در کارتن
export function getItemUnitCount(item) {
  const quantity = Number(item.quantity);

  return item.orderType === "carton"
    ? quantity * Number(item.cartonCount || 1)
    : quantity;
}

// مبلغ یک ردیف سبد با قیمت نوع پرداخت انتخاب‌شده
export function getItemTotal(item) {
  return getProductPrice(item, item.paymentType) * getItemUnitCount(item);
}
