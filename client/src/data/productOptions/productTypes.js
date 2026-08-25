// دسته‌بندی محصولات (category) توی دیتابیس متن آزاده و از فایل اکسل ایمپورت
// می‌شه، پس شکل‌های خیلی متفاوتی داره. این لیست یه دسته‌بندی ساده و ثابت روی
// اون متن‌های خام می‌ذاره تا فیلتر «نوع محصول» قابل استفاده باشه.
// ترتیب مهمه: هر دسته با اولین کلیدواژه‌ای که توی category پیدا بشه تعیین می‌شه.
const productTypes = [
  {
    id: "grease",
    label: "گریس",
    labelEn: "Grease",
    keywords: ["گریس"],
  },
  {
    id: "washerFluid",
    label: "شیشه‌شوی",
    labelEn: "Washer Fluid",
    keywords: ["شیشه"],
  },
  {
    id: "antifreeze",
    label: "ضدیخ و خنک‌کننده",
    labelEn: "Antifreeze & Coolant",
    keywords: ["ضدیخ", "ضد یخ", "ضدجوش", "کولانت", "خنک کننده", "خنک‌کننده"],
  },
  {
    id: "brakeFluid",
    label: "روغن ترمز",
    labelEn: "Brake Fluid",
    keywords: ["ترمز"],
  },
  {
    id: "filter",
    label: "فیلتر",
    labelEn: "Filter",
    keywords: ["فیلتر"],
  },
  {
    id: "hydraulic",
    label: "هیدرولیک",
    labelEn: "Hydraulic Fluid",
    keywords: ["هیدرولیک"],
  },
  {
    id: "gearOil",
    label: "روغن گیربکس",
    labelEn: "Gear Oil",
    keywords: ["گیربکس", "دنده", "اتوماتیک", "getriebe"],
  },
  {
    id: "additive",
    label: "مکمل و اسپری",
    labelEn: "Additives & Sprays",
    keywords: [
      "مکمل",
      "بوستر",
      "اسپری",
      "شامپو",
      "لکه بر",
      "لکه‌بر",
      "مراقبتی",
    ],
  },
  {
    id: "engineOil",
    label: "روغن موتور",
    labelEn: "Engine Oil",
    keywords: ["موتور"],
  },
];

export default productTypes;
