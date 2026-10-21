// تاریخ شمسی با تقویم persian خود مرورگر (Intl)؛ همیشه به وقت تهران تا با گزارش سرور یکی باشه
const TIME_ZONE = "Asia/Tehran";

export const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const partsFormatter = new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

// ارقام فارسی/عربی ← انگلیسی (برای جستجوی شماره تماس)
export function toLatinDigits(value) {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit));
}

const pad2 = (number) => String(number).padStart(2, "0");

// { year, month, day, hour, minute } شمسی؛ تاریخ نامعتبر ← null
export function toJalali(date) {
  const value = new Date(date);

  if (!date || Number.isNaN(value.getTime())) return null;

  const parts = {};

  partsFormatter.formatToParts(value).forEach(({ type, value: part }) => {
    parts[type] = Number(part);
  });

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
  };
}

// «۱۴۰۵/۰۷/۲۹ - ۱۹:۰۹»
export function formatJalaliDateTime(date) {
  const jalali = toJalali(date);

  if (!jalali) return "";

  const { year, month, day, hour, minute } = jalali;

  return toPersianDigits(`${year}/${pad2(month)}/${pad2(day)} - ${pad2(hour)}:${pad2(minute)}`);
}

// کلید مرتب‌شدنی ماه: «1405-07»
export function jalaliMonthKey(year, month) {
  return `${year}-${pad2(month)}`;
}

// «مهر ۱۴۰۵»
export function jalaliMonthLabel(year, month) {
  return `${JALALI_MONTHS[month - 1]} ${toPersianDigits(year)}`;
}

export function currentJalaliMonth() {
  const { year, month } = toJalali(new Date());

  return { year, month };
}
