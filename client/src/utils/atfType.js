import getMenuCategorySlug from "./classifyMenuCategory";

// نوع روغن گیربکس اتوماتیک (CVT، DCT، AL4، دکسرون...) برای کارت محصول.
// گرید و API این محصولات اکثراً خالیه و نوعشون فقط توی گرید (وم اویل) یا
// توضیحات (پترولکس، ایدلوب، ادینول، بهتام) اومده، پس هر سه رو می‌گردیم.
// اولین کدی که توی متن اومده برنده‌ست، چون توضیحات بعداً از گیربکس‌های دیگه
// هم اسم می‌برن (مثلاً ATF CVT ادینول از DCT). سر هم‌جایی، کد خاص‌تر بالای
// لیست (MVLV-WS) بر کلی‌تر (MVLV) مقدمه.
const ATF_TYPES = [
  { pattern: /\bDCT\b/i, label: "DCT" },
  { pattern: /\bCVT\b/i, label: "CVT" },
  { pattern: /\bAL4\b/i, label: "AL4" },
  { pattern: /\bMVLV[- ]?WS\b/i, label: "MVLV-WS" },
  { pattern: /\bMVLV\b/i, label: "MVLV" },
  { pattern: /\bXN\s?(\d)\b/i, label: (m) => `XN ${m[1]}` },
  { pattern: /\b(?:ATF|DX)\s?(?:VI|6)\b/i, label: "DEXRON VI" },
  { pattern: /\b(?:ATF|DX)\s?(?:III|3)\b/i, label: "DEXRON III" },
  { pattern: /\bATF\s?IV\b/i, label: "ATF IV" },
];

export function isAtfProduct(product) {
  return getMenuCategorySlug(product) === "automatic-transmission";
}

export function getAtfType(product) {
  const text = [product.viscosity, product.name, product.description]
    .filter(Boolean)
    .join(" ");

  let best = null;

  for (const { pattern, label } of ATF_TYPES) {
    const match = text.match(pattern);
    if (match && (!best || match.index < best.match.index)) {
      best = { match, label };
    }
  }

  if (!best) return "";
  return typeof best.label === "function" ? best.label(best.match) : best.label;
}
