// خطاهای AppError (isOperational) پیام فارسی مشخص برای کاربر دارن و همون برمی‌گرده؛
// بقیه‌ی خطاها (Mongo، باگ کد و …) فقط در لاگ سرور کامل ثبت می‌شن و کاربر پیام عمومی می‌بینه
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.log("ERROR:", err.message);

  // MulterError (مثلاً فایل بزرگ‌تر از سقف) خطای ورودی ادمینه، نه خطای سرور
  const isMulter = err.name === "MulterError";
  const statusCode = err.statusCode || err.status || (isMulter ? 400 : 500);
  const expose = err.isOperational || isMulter || (statusCode < 500 && err.expose);

  res.status(statusCode).json({
    success: false,

    message: expose && err.message ? err.message : "خطای داخلی سرور",
  });
}

module.exports = errorHandler;
