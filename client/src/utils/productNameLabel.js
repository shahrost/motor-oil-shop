// Short category names used across most of the catalog (see the brand
// rename pass) translate one-to-one; this keeps the product name in sync
// with the language toggle without needing a second "nameEn" field in the
// database for every product.
const NAME_TRANSLATIONS = {
  "تمام سنتتیک": "Full Synthetic",
  "نیمه سنتتیک": "Semi-Synthetic",
  "معدنی": "Mineral",
  "روغن موتور": "Engine Oil",
  "روغن موتورسیکلت": "Motorcycle Oil",
  "روغن موتورسیکلت تمام سنتتیک": "Full Synthetic Motorcycle Oil",
  "روغن موتورسیکلت سنتتیک": "Synthetic Motorcycle Oil",
  "روغن دنده": "Gear Oil",
  "روغن دنده اتومات": "Automatic Transmission Oil",
  "روغن اتوماتیک": "Automatic Transmission Fluid",
  "ضدیخ": "Antifreeze",
  "کولانت": "Coolant",
  "گریس": "Grease",
  "گریس نسوز": "Heat-Resistant Grease",
  "واسکازین": "Extreme Pressure Gear Oil",
  "هیدرولیک": "Hydraulic Oil",
  "روغن ترمز لاکی": "Brake Fluid (DOT3)",
  "روغن ترمز آتی": "Brake Fluid (DOT4)",
  "روغن ۱۰ قطره": "Light Machine Oil (SAE10)",
  "مکمل روغن": "Oil Additive",
  "اکتان": "Octane Booster",
  "شیشه‌شوی": "Windshield Washer Fluid",
};

// "روغن دنده اتوماتیک <CODE>" (WomOil / Petrolex) keeps its fluid-type
// code (DCT, CVT, AL4, VI, III, MVLV-WS...) as-is and only translates the
// Persian prefix.
const ATF_PREFIX = "روغن دنده اتوماتیک ";
const ATF_PREFIX_EN = "Automatic Transmission Fluid ";

export function getProductNameLabel(name, language) {
  if (language !== "en") return name;

  const trimmed = (name || "").trim();

  if (NAME_TRANSLATIONS[trimmed]) return NAME_TRANSLATIONS[trimmed];

  if (trimmed.startsWith(ATF_PREFIX)) {
    return ATF_PREFIX_EN + trimmed.slice(ATF_PREFIX.length);
  }

  return name;
}

export default getProductNameLabel;
