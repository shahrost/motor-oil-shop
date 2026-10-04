// رنگ هر وضعیت سفارش: نوار کنار کارت + برچسب توپر (خوانا در حالت روز و شب)
const STATUS_STYLES = {
  "جدید": { stripe: "border-yellow-400", badge: "bg-yellow-400 text-gray-950" },
  "تماس گرفته شد": { stripe: "border-blue-500", badge: "bg-blue-600 text-white" },
  "آماده ارسال": { stripe: "border-orange-500", badge: "bg-orange-500 text-white" },
  "ارسال شد": { stripe: "border-green-500", badge: "bg-green-600 text-white" },
  "تحویل شد": { stripe: "border-gray-400", badge: "bg-gray-500 text-white" },
};

const DEFAULT_STYLE = { stripe: "border-gray-300", badge: "bg-gray-500 text-white" };

function orderStatusStyle(status) {
  return STATUS_STYLES[status] || DEFAULT_STYLE;
}

export default orderStatusStyle;
