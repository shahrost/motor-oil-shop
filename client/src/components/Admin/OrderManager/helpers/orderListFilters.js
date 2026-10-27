import { toJalali, jalaliMonthKey, jalaliMonthLabel } from "../../../../utils/jalaliDate";
import { toLatinDigits } from "../../../../utils/digits";

export const ALL_STATUSES = "همه";

export const ALL_MONTHS = "all";

// زمان ثبت سفارش (createdAt سرور)
const orderTime = (order) => new Date(order.createdAt || 0).getTime();

// جدیدترین سفارش اول
export function sortNewestFirst(orders) {
  return [...orders].sort((a, b) => orderTime(b) - orderTime(a));
}

// «1405-07» ماه شمسی ثبت سفارش؛ بدون createdAt ← ""
export function orderMonthKey(order) {
  const jalali = toJalali(order.createdAt);

  return jalali ? jalaliMonthKey(jalali.year, jalali.month) : "";
}

// ماه‌هایی که سفارش دارن، جدیدترین اول: [{ key, label }]
export function orderMonthOptions(orders) {
  const months = new Map();

  orders.forEach((order) => {
    const jalali = toJalali(order.createdAt);

    if (jalali) {
      months.set(jalaliMonthKey(jalali.year, jalali.month), jalaliMonthLabel(jalali.year, jalali.month));
    }
  });

  return [...months.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, label]) => ({ key, label }));
}

// جستجو در نام، شماره تماس (ارقام فارسی و انگلیسی)، منطقه و نام محصولات
export function matchesSearch(order, search) {
  const text = toLatinDigits(search).trim().toLowerCase();

  if (!text) return true;

  const fields = [
    order.customer?.name,
    toLatinDigits(order.customer?.phone || ""),
    order.customer?.area,
    ...(order.items || []).map((item) => item.productName),
  ];

  return fields.some((field) => field?.toLowerCase().includes(text));
}

export function matchesFilters(order, { search, status, month }) {
  return (
    matchesSearch(order, search) &&
    (status === ALL_STATUSES || order.status === status) &&
    (month === ALL_MONTHS || orderMonthKey(order) === month)
  );
}
