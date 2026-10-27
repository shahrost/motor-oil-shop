import { toLatinDigits } from "./digits";

// شماره موبایل ایران: ۱۱ رقم و با 09 شروع (برای ویژگی pattern فیلد)
export const MOBILE_PATTERN = "09[0-9]{9}";

// مقدار فیلد موبایل موقع تایپ: ارقام فارسی/عربی ← انگلیسی و فقط رقم (حداکثر ۱۱)
export function cleanPhoneInput(value) {
  return toLatinDigits(value).replace(/\D/g, "").slice(0, 11);
}
