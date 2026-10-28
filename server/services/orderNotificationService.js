const { sendSms, isSmsConfigured } = require("./smsService");
const buildOrderSmsMessage = require("../utils/orderSmsMessage");

// شماره(های) موبایل صاحب فروشگاه برای خبر سفارش جدید: ORDER_SMS_RECEPTORS (با کاما جدا)
function getReceptors() {
  return (process.env.ORDER_SMS_RECEPTORS || "")
    .split(",")
    .map((phone) => phone.trim())
    .filter((phone) => /^09\d{9}$/.test(phone));
}

// بعد از ذخیره‌ی سفارش صدا زده می‌شه و منتظرش نمی‌مونیم: خطا یا کندی پنل پیامک
// هیچ‌وقت ثبت سفارش مشتری رو خراب یا کند نمی‌کنه، فقط در لاگ سرور ثبت می‌شه
function notifyNewOrder(order) {
  const receptors = getReceptors();
  if (!isSmsConfigured() || !receptors.length) return;

  sendSms(receptors, buildOrderSmsMessage(order)).catch((error) =>
    console.error(`Order SMS failed (${order.id}):`, error.message),
  );
}

module.exports = { notifyNewOrder };
