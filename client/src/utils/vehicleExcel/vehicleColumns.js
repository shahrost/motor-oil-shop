// ستون‌های اکسل ایمپورت خودرو (برچسب ستون ← کلید)
// باید با server/utils/vehicleColumns.js هماهنگ بمونه.

export const LIST_SHEET = "لیست خودروها";
export const LINKS_SHEET = "ارتباط محصولات";

export const SIMPLE_COLUMN_MAP = {
  "کد خودرو": "sku",
  "نام خودرو": "name",
  "نام انگلیسی خودرو": "nameEn",
  "برند خودرو": "brand",
  "برند انگلیسی": "brandEn",
  "سال ساخت": "years",
  "سال ساخت (انگلیسی)": "yearsEn",
  موتور: "engine",
  "موتور (انگلیسی)": "engineEn",
  "حجم روغن موتور (لیتر)": "oilCapacity",
  "ویسکوزیته‌های پیشنهادی": "viscosities",
  "استاندارد API": "api",
  "فاصله تعویض روغن (کیلومتر)": "interval",
  "نام فایل عکس": "image",
};

export const LIST_COLUMN_MAP = {
  "کد خودرو": "sku",
  برند: "brand",
  "کشور برند": "country",
  مدل: "model",
  "تیپ / نسخه": "variant",
  "نام کامل خودرو": "fullName",
  موتور: "engine",
  "حجم موتور (لیتر)": "engineSize",
  سوخت: "fuel",
  گیربکس: "gearbox",
  بدنه: "body",
  "گروه خودروسازی / واردکننده": "maker",
  وضعیت: "status",
  "نام فایل عکس": "image",
  "ویسکوزیته پیشنهادی (اصلی)": "viscosity",
  "ویسکوزیته جایگزین": "viscosityAlt",
  // ستون‌های اختیاری؛ اگه توی فایل نباشن همون رفتار قبلی حفظ می‌شه
  "نام انگلیسی خودرو": "nameEn",
  "سال ساخت": "years",
  "سال ساخت (انگلیسی)": "yearsEn",
  "حجم روغن موتور (لیتر)": "oilCapacity",
  "استاندارد API": "api",
  "فاصله تعویض روغن (کیلومتر)": "interval",
};

export const LINKS_COLUMN_MAP = {
  "کد خودرو": "vehicleSku",
  "کد محصول": "productSku",
  "اولویت نمایش": "priority",
  "نوع توصیه": "kind",
};
