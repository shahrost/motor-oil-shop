const rateLimit = require("express-rate-limit");

// ثبت سفارش: هر IP حداکثر ۱۰ سفارش در ۱۵ دقیقه (جلوی سفارش‌های جعلی انبوه)
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "تعداد ثبت سفارش بیش از حد مجاز است، کمی بعد دوباره تلاش کنید یا تماس بگیرید",
  },
});

module.exports = orderLimiter;
