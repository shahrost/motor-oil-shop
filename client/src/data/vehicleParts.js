import { Barrel, Cog, Droplets, Funnel, Snowflake, Thermometer } from "lucide-react";

// دسته‌های دکمه‌های صفحه‌ی خودرو. specific یعنی محصولش مخصوص خودروئه و فقط
// از لینک‌های ایمپورت اکسل (productLinks) میاد؛ بقیه (ضدیخ، آب رادیاتور،
// شیشه‌شور) اگه لینک مشخص نداشته باشن همه‌ی محصولات فعال اون دسته نشون داده می‌شن.
const VEHICLE_PARTS = [
  { key: "oil", icon: Barrel },
  { key: "filter", icon: Funnel, slug: null, specific: true },
  { key: "gearboxFilter", icon: Cog, slug: "gearbox-filter", specific: true },
  { key: "antifreeze", icon: Snowflake, slug: "antifreeze" },
  { key: "coolant", icon: Thermometer, slug: "coolant" },
  { key: "washer", icon: Droplets, slug: "windshield-washer" },
];

export default VEHICLE_PARTS;
