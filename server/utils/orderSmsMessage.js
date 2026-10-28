// متن پیامک «سفارش جدید» برای صاحب فروشگاه؛ کوتاه نگه داشته شده چون هر ۷۰ حرف فارسی یک پیامک حساب می‌شه
const PAYMENT_LABELS = { cash: "نقدی", check: "چکی" };

const formatToman = (amount) => `${new Intl.NumberFormat("fa-IR").format(amount)} تومان`;

function paymentSummary(items) {
  const types = [...new Set(items.map((item) => item.paymentType || "cash"))];

  return types.map((type) => PAYMENT_LABELS[type] || type).join(" و ");
}

function buildOrderSmsMessage(order) {
  const lines = [
    `سفارش جدید #${String(order.id).slice(0, 8)}`,
    `${order.customer.name} - ${order.customer.phone}`,
    order.customer.area ? `منطقه: ${order.customer.area}` : "",
    `${new Intl.NumberFormat("fa-IR").format(order.items.length)} قلم، ${paymentSummary(order.items)}`,
    `مبلغ: ${formatToman(order.totalPrice)}`,
  ];

  return lines.filter(Boolean).join("\n");
}

module.exports = buildOrderSmsMessage;
