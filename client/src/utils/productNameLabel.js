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

  // ووفر: برند دست‌نخورده مونده (خط تولید کاملاً متفاوته)، پس هر اسم
  // به‌صورت جداگانه ترجمه شده، نه با یه قاعده‌ی مشترک.
  "ستان بوستر ووفر | Cetane Booster": "Woofer Cetane Booster",
  "اکتان بوستر تیتان  TITAN": "Woofer Titan Octane Booster",
  "روغن موتورسیکلت sl20w50 ووفر (1 لیتر)": "Woofer Motorcycle Oil SL 20W-50 (1L)",
  "احیاگر موتور ووفر Lube Max": "Woofer Lube Max Engine Restorer",
  "خرید کولانت cool down (4 لیتری)": "Woofer Cool Down Coolant (4L)",
  "شامپو واترلس (waterless)": "Woofer Waterless Car Wash Shampoo",
  "اسپری موتورشو و رینگ‌شو": "Woofer Engine & Piston Ring Cleaner Spray",
  "اسپری صفرشو و لکه بر داخل خودرو": "Woofer Interior Restorer & Stain Remover Spray",
  "اسپری براق کنندۀ لاستیک": "Woofer Tire Shine Spray",
  "شامپو vip بدنه خودرو": "Woofer VIP Car Body Shampoo",
  "سوخت مسابقه ای C45 ووفر": "Woofer C45 Racing Fuel",
  "پاک کننده سریع وهمه کاره ووفر (انژکتور شوی Golden)": "Woofer Golden Quick All-Purpose Injector Cleaner",
  "سوخت مسابقه‌ای C16": "Woofer C16 Racing Fuel",
  "سوخت مسابقه ای Q16": "Woofer Q16 Racing Fuel",
  "مکمل بنزین اکتانیوم": "Woofer Octanium Fuel Additive",
  "مایع ترمز dot4 (روغن ترمز)": "Woofer Brake Fluid DOT4",
  "مایع ترمز dot3 (روغن ترمز)": "Woofer Brake Fluid DOT3",
  "محافظ کاتالیست اگزوز": "Woofer Catalytic Converter Protector",
  "موتور شوی انجین فلاش (ENGINE FLUSH)": "Woofer Engine Flush",
  "کلینر یا درمان کننده موتور": "Woofer Engine Cleaner / Treatment",
  "مکمل بنزین ch-b+": "Woofer CH-B+ Fuel Additive",
  "مکمل بنزین ch-c+ (ویژه اتمسفر)": "Woofer CH-C+ Fuel Additive (Naturally Aspirated)",
  "مکمل بنزین ch-power": "Woofer CH-Power Fuel Additive",
  "اکتان بوستر shot pro 8 (تنفس طبیعی)": "Woofer Shot Pro 8 Octane Booster (Naturally Aspirated)",
  "اکتان بوستر shot pro 4": "Woofer Shot Pro 4 Octane Booster",
  "ضدیخ و ضدجوش 1 لیتری ووفر": "Woofer Antifreeze & Anti-Boil 1L",
  "مکمل سوخت power increaser professional (پاور اینکریزر)": "Woofer Power Increaser Professional Fuel Additive",
  "اکتان بوستر shot pro 10": "Woofer Shot Pro 10 Octane Booster",
  "اکتان بوستر shot pro 6 (تنفس طبیعی)": "Woofer Shot Pro 6 Octane Booster (Naturally Aspirated)",
  "مکمل سوخت shot pro 3": "Woofer Shot Pro 3 Fuel Additive",
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
