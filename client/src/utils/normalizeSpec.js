const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ZWNJ = "‌";

function toLatinDigits(value) {
  return String(value || "").replace(
    /[۰-۹]/g,
    (d) => PERSIAN_DIGITS.indexOf(d),
  );
}

function stripSpacing(value) {
  return value.split(ZWNJ).join("").replace(/\s/g, "");
}

export function normalizeViscosity(value) {
  return stripSpacing(toLatinDigits(value).toUpperCase().replace(/SAE/g, "")).replace(
    /-/g,
    "",
  );
}

export function normalizeApi(value) {
  return stripSpacing(String(value || "").toUpperCase()).replace(/-/g, "");
}

export function normalizeVolume(value) {
  let str = stripSpacing(
    toLatinDigits(value).toLowerCase().replace(/\([^)]*\)/g, ""),
  );

  str = str
    .replace(/لیتری|لیتر/g, "l")
    .replace(/سی‌?سی/g, "cc")
    .replace(/کیلوگرمی|کیلویی|کیلوگرم|کیلو/g, "kg")
    .replace(/گرمی|گرم/g, "g")
    .replace(/پوندی|پوند/g, "lb");

  return str;
}
