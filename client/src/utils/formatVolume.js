const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function toLatinDigits(value) {
  return String(value || "").replace(
    /[۰-۹]/g,
    (d) => PERSIAN_DIGITS.indexOf(d),
  );
}

// Order matters: longer/compound units must be matched before the shorter
// unit they contain (میلی‌لیتر contains لیتر, کیلوگرمی contains گرم).
const UNIT_REPLACEMENTS = [
  [/کیلوگرمی|کیلوگرم|کیلویی|کیلو/g, "kg"],
  [/میلی‌?لیتر/g, "ml"],
  [/لیتری|لیتر/g, "L"],
  [/سی‌?سی/g, "cc"],
  [/گرمی|گرم/g, "g"],
  [/پوندی|پوند/g, "lb"],
];

const NOTE_REPLACEMENTS = [
  [/بشکه فلزی/g, "metal drum"],
  [/فلزی/g, "metal"],
];

// Product volume is free text from the source data ("۲۰۵ لیتری (بشکه
// فلزی)", "1 لیتر", "300 میلی‌لیتر"...). This converts it to English for
// the language toggle: Persian digits -> Latin, and the unit/notes words.
export function formatVolume(volume, language) {
  if (language !== "en" || !volume) return volume;

  let result = toLatinDigits(volume);

  UNIT_REPLACEMENTS.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  NOTE_REPLACEMENTS.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  return result;
}

export default formatVolume;
