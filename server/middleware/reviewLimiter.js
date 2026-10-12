const rateLimit = require("express-rate-limit");

// ثبت امتیاز/نظر: هر IP حداکثر ۱۰ بار در ۱۵ دقیقه (جلوی اسپم)
const reviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "تعداد ثبت نظر بیش از حد مجاز است، کمی بعد دوباره تلاش کنید",
  },
});

module.exports = reviewLimiter;
