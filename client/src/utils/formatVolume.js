import { toLatinDigits, toPersianDigits } from "./digits";

// حجم محصول در داده متن آزاده («4L»، «4 لیتر»، «۴ لیتری»، «500CC»، «۳۰۰ سی‌سی»، «300ML»،
// «۲۰۵ لیتری (بشکه فلزی)»...). این تابع فقط برای نمایش یکدستش می‌کنه:
// فارسی ← «۴ لیتر»، «۵۰۰ سی‌سی» (ارقام فارسی)؛ انگلیسی ← «4 L»، «500 ml».
// توضیح داخل پرانتز حفظ می‌شه (در انگلیسی ترجمه). متنی که شناخته نشه همون‌طور (با ارقام زبان) برمی‌گرده.

// ترتیب مهمه: واحد بلندتر قبل از واحدی که داخلشه (میلی‌لیتر شامل لیتر، کیلوگرم شامل گرم)
const UNITS = [
  { pattern: /^(?:کیلوگرمی|کیلوگرم|کیلویی|کیلو|kg)$/i, fa: "کیلوگرم", en: "kg" },
  { pattern: /^(?:میلی‌?\s?لیتری?|ml|سی‌?\s?سی|cc)$/i, fa: "سی‌سی", en: "ml" },
  { pattern: /^(?:لیتری|لیتر|l|lit|liter|litre)$/i, fa: "لیتر", en: "L" },
  { pattern: /^(?:گرمی|گرم|g|gr)$/i, fa: "گرم", en: "g" },
  { pattern: /^(?:پوندی|پوند|lb|lbs)$/i, fa: "پوند", en: "lb" },
];

const NOTE_REPLACEMENTS = [
  [/بشکه فلزی/g, "metal drum"],
  [/فلزی/g, "metal"],
  [/پلاستیکی/g, "plastic"],
];

// «عدد + واحد + (توضیح)»؛ عدد با ممیز «.» یا «٫»
const VOLUME_PATTERN = /^\s*(\d+(?:[.٫]\d+)?)\s*([^\d\s(][^(]*?)?\s*(\(.*\))?\s*$/;

function translateNote(note) {
  return NOTE_REPLACEMENTS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    note,
  );
}

export function formatVolume(volume, language) {
  if (!volume) return volume;

  const isEn = language === "en";
  const latin = toLatinDigits(volume).trim();
  const match = latin.match(VOLUME_PATTERN);
  const unit = match?.[2] && UNITS.find((item) => item.pattern.test(match[2].trim()));

  if (!match || !unit) {
    return isEn ? translateNote(latin) : toPersianDigits(latin);
  }

  const amount = match[1].replace("٫", ".");
  const note = match[3] ? ` ${isEn ? translateNote(match[3]) : match[3]}` : "";

  return isEn
    ? `${amount} ${unit.en}${note}`
    : `${toPersianDigits(amount)} ${unit.fa}${toPersianDigits(note)}`;
}

export default formatVolume;
