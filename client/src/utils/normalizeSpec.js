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

// Converts a free-text volume ("4 لیتری", "300cc", "3.5L", "1 پوندی", ...) into a
// { family, value } pair so volumes can be sorted numerically ascending.
// `family` keeps unrelated units (liquid volume vs. weight) from interleaving;
// `value` is the numeric size normalized within that family (e.g. cc -> liters).
export function getVolumeSortValue(volume) {
  const normalized = normalizeVolume(volume);
  const match = normalized.match(/^([\d.]+)(cc|l|kg|g|lb)?$/);

  if (!match || Number.isNaN(parseFloat(match[1]))) {
    return { family: 9, value: Number.MAX_SAFE_INTEGER };
  }

  const num = parseFloat(match[1]);

  switch (match[2]) {
    case "cc":
      return { family: 0, value: num / 1000 };
    case "l":
      return { family: 0, value: num };
    case "g":
      return { family: 1, value: num / 1000 };
    case "kg":
      return { family: 1, value: num };
    case "lb":
      return { family: 2, value: num };
    default:
      return { family: 3, value: num };
  }
}

export function compareVolumes(volumeA, volumeB) {
  const a = getVolumeSortValue(volumeA);
  const b = getVolumeSortValue(volumeB);

  return a.family !== b.family ? a.family - b.family : a.value - b.value;
}
