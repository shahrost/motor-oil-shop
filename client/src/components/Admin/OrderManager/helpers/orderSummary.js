import { formatJalaliDateTime } from "../../../../utils/jalaliDate";
import { toPersianDigits } from "../../../../utils/digits";

// مبلغ با ارقام و جداکننده‌ی فارسی: «۱٬۲۵۰٬۰۰۰ تومان»
export function formatToman(value) {
  return `${Number(value || 0).toLocaleString("fa-IR")} تومان`;
}

// نوع پرداخت کل سفارش از روی ردیف‌ها (هر ردیف نوع پرداخت خودش رو داره)
function orderPayment(items = []) {
  const types = new Set(items.map((item) => item.paymentType || "cash"));

  if (types.size > 1) return { label: "نقدی + اعتباری", className: "text-purple-700" };

  if (types.has("check")) return { label: "📝 اعتباری", className: "text-blue-700" };

  return { label: "💵 نقدی", className: "text-green-700" };
}

// تاریخ و ساعت شمسی ثبت؛ سفارش‌های خیلی قدیمی شاید createdAt نداشته باشن ← همون رشته‌ی تاریخ ثبت
export function orderDateLabel(order) {
  return formatJalaliDateTime(order.createdAt) || order.date || "";
}

// اطلاعات ردیف فشرده‌ی یک سفارش در پنل ادمین
function orderSummary(order) {
  const items = order.items || [];

  return {
    name: order.customer?.name || "—",
    phone: order.customer?.phone || "",
    date: orderDateLabel(order),
    itemCount: `${toPersianDigits(items.length)} قلم`,
    total: formatToman(order.totalPrice),
    payment: orderPayment(items),
  };
}

export default orderSummary;
