import {
  Bike,
  Cog,
  Cylinder,
  Disc,
  Droplet,
  Droplets,
  FlaskConical,
  Funnel,
  Gauge,
  Package,
  Settings2,
  Snowflake,
  SprayCan,
  Thermometer,
  Truck,
  Zap,
} from "lucide-react";

// دسته‌بندی‌های ثابت منوی «محصولات» توی هدر. هر محصول با
// utils/classifyMenuCategory بر اساس برند و category خامش به یکی از این
// slugها نگاشت می‌شه (چون category خام توی دیتابیس بین برندها یکسان نیست).
// icon: آیکون دکمه‌ی دسته در ردیف «دسته‌های سریع» صفحه‌ی محصولات
const menuCategories = [
  { slug: "gasoline-engine-oil", label: "روغن موتور بنزینی", labelEn: "Gasoline Engine Oil", icon: Droplet },
  { slug: "diesel-engine-oil", label: "روغن موتور دیزلی", labelEn: "Diesel Engine Oil", icon: Truck },
  { slug: "motorcycle-oil", label: "روغن موتورسیکلت", labelEn: "Motorcycle Oil", icon: Bike },
  { slug: "brake-fluid", label: "روغن ترمز", labelEn: "Brake Fluid", icon: Disc },
  { slug: "antifreeze", label: "ضدیخ", labelEn: "Antifreeze", icon: Snowflake },
  { slug: "coolant", label: "کولانت", labelEn: "Coolant", icon: Thermometer },
  { slug: "grease", label: "گریس", labelEn: "Grease", icon: Cylinder },
  { slug: "hydraulic-oil", label: "روغن هیدرولیک", labelEn: "Hydraulic Oil", icon: Gauge },
  { slug: "gear-oil", label: "روغن دنده", labelEn: "Gear Oil", icon: Cog },
  { slug: "extreme-pressure-gear-oil", label: "واسکازین", labelEn: "Extreme Pressure Gear Oil", icon: Cog },
  { slug: "automatic-transmission", label: "روغن دنده اتوماتیک", labelEn: "Automatic Transmission Fluid", icon: Settings2 },
  { slug: "octane-booster", label: "اکتان بوستر", labelEn: "Octane Booster", icon: Zap },
  { slug: "oil-additive", label: "مکمل روغن", labelEn: "Oil Additive", icon: FlaskConical },
  { slug: "windshield-washer", label: "شیشه‌شویی", labelEn: "Windshield Washer", icon: SprayCan },
  { slug: "light-machine-oil", label: "روغن ۱۰ قطره", labelEn: "Light Machine Oil", icon: Droplets },
  { slug: "gearbox-filter", label: "فیلتر گیربکس", labelEn: "Transmission Filter", icon: Funnel },
  { slug: "other", label: "سایر محصولات", labelEn: "Other Products", icon: Package },
];

export default menuCategories;
