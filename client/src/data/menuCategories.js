// دسته‌بندی‌های ثابت منوی «محصولات» توی هدر. هر محصول با
// utils/classifyMenuCategory بر اساس برند و category خامش به یکی از این
// slugها نگاشت می‌شه (چون category خام توی دیتابیس بین برندها یکسان نیست).
const menuCategories = [
  { slug: "gasoline-engine-oil", label: "روغن موتور بنزینی", labelEn: "Gasoline Engine Oil" },
  { slug: "diesel-engine-oil", label: "روغن موتور دیزلی", labelEn: "Diesel Engine Oil" },
  { slug: "motorcycle-oil", label: "روغن موتورسیکلت", labelEn: "Motorcycle Oil" },
  { slug: "brake-fluid", label: "روغن ترمز", labelEn: "Brake Fluid" },
  { slug: "antifreeze", label: "ضدیخ", labelEn: "Antifreeze" },
  { slug: "coolant", label: "کولانت", labelEn: "Coolant" },
  { slug: "grease", label: "گریس", labelEn: "Grease" },
  { slug: "hydraulic-oil", label: "روغن هیدرولیک", labelEn: "Hydraulic Oil" },
  { slug: "gear-oil", label: "روغن دنده", labelEn: "Gear Oil" },
  { slug: "extreme-pressure-gear-oil", label: "واسکازین", labelEn: "Extreme Pressure Gear Oil" },
  { slug: "automatic-transmission", label: "روغن دنده اتوماتیک", labelEn: "Automatic Transmission Fluid" },
  { slug: "octane-booster", label: "اکتان بوستر", labelEn: "Octane Booster" },
  { slug: "oil-additive", label: "مکمل روغن", labelEn: "Oil Additive" },
  { slug: "windshield-washer", label: "شیشه‌شویی", labelEn: "Windshield Washer" },
  { slug: "light-machine-oil", label: "روغن ۱۰ قطره", labelEn: "Light Machine Oil" },
  { slug: "other", label: "سایر محصولات", labelEn: "Other Products" },
];

export default menuCategories;
