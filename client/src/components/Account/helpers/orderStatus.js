// رنگ برچسب وضعیت سفارش در صفحه‌ی حساب کاربری
const STATUS_COLORS = {
  جدید: "bg-yellow-200 text-yellow-900",
  "تماس گرفته شد": "bg-blue-200 text-blue-900",
  "آماده ارسال": "bg-orange-200 text-orange-900",
  "ارسال شد": "bg-green-200 text-green-900",
  "تحویل شد": "bg-gray-300 text-gray-900",
};

// وضعیت‌ها فارسی ذخیره می‌شن؛ کلید ترجمه‌ی هر کدوم
const STATUS_KEYS = {
  جدید: "new",
  "تماس گرفته شد": "contacted",
  "آماده ارسال": "readyToShip",
  "ارسال شد": "shipped",
  "تحویل شد": "delivered",
};

export function statusColor(status) {
  return STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
}

export function statusLabel(status, t) {
  const key = STATUS_KEYS[status];

  return key ? t(`account.orderStatus.${key}`) : status;
}
