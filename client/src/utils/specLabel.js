// برچسب‌های «API:» و «گرید:» کنار مقدار نوشته می‌شن؛ پیشوند تکراری داخل خود مقدار فقط در نمایش حذف می‌شه:
// «API SP» ← «SP»، «API GL-4, API GL-5» ← «GL-4, GL-5»، «SAE 5W-30» ← «5W-30»
export function formatApi(value) {
  if (!value) return value;

  return String(value).replace(/(^|,\s*)API\s*/gi, "$1").trim();
}

export function formatViscosity(value) {
  if (!value) return value;

  return String(value).replace(/^\s*SAE\s*/i, "").trim();
}
