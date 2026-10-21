// تاریخ شمسی با تقویم persian خود Node (ICU کامل)؛ همیشه به وقت تهران
const TIME_ZONE = "Asia/Tehran";

const DAY_MS = 24 * 60 * 60 * 1000;

const MONTH_NAMES = [
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

function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

const pad2 = (number) => String(number).padStart(2, "0");

// { year, month, day, hour, minute } شمسی (عدد)
function toJalali(date) {
  const parts = {};

  partsFormatter.formatToParts(new Date(date)).forEach(({ type, value }) => {
    parts[type] = Number(value);
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
function formatJalaliDateTime(date) {
  const { year, month, day, hour, minute } = toJalali(date);

  return toPersianDigits(`${year}/${pad2(month)}/${pad2(day)} - ${pad2(hour)}:${pad2(minute)}`);
}

// «مهر ۱۴۰۵»
function jalaliMonthLabel(year, month) {
  return `${MONTH_NAMES[month - 1]} ${toPersianDigits(year)}`;
}

function isInJalaliMonth(date, year, month) {
  const jalali = toJalali(date);

  return jalali.year === year && jalali.month === month;
}

// بازه‌ی میلادیِ کمی بزرگ‌تر از یک ماه شمسی (۳ روز حاشیه از هر طرف) برای کوئری دیتابیس.
// ۱ فروردین همیشه ۲۰ یا ۲۱ مارس است؛ تطبیق دقیق بعدش با isInJalaliMonth انجام می‌شه
function approxGregorianRange(year, month) {
  const nowruz = Date.UTC(year + 621, 2, 21);
  const startOffsetDays = month <= 6 ? (month - 1) * 31 : 186 + (month - 7) * 30;

  return {
    from: new Date(nowruz + (startOffsetDays - 3) * DAY_MS),
    to: new Date(nowruz + (startOffsetDays + 31 + 3) * DAY_MS),
  };
}

module.exports = {
  MONTH_NAMES,
  toPersianDigits,
  toJalali,
  formatJalaliDateTime,
  jalaliMonthLabel,
  isInJalaliMonth,
  approxGregorianRange,
};
