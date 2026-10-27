// تبدیل ارقام بین فارسی/عربی و انگلیسی؛ همه‌ی utils از همین یکی استفاده می‌کنن
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

// ارقام فارسی و عربی ← انگلیسی؛ null/undefined ← ""
export function toLatinDigits(value) {
  return String(value ?? "")
    .replace(/[۰-۹]/g, (digit) => PERSIAN_DIGITS.indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => ARABIC_DIGITS.indexOf(digit));
}

// ارقام انگلیسی ← فارسی
export function toPersianDigits(value) {
  return String(value ?? "").replace(/\d/g, (digit) => PERSIAN_DIGITS[digit]);
}
