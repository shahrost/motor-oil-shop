// تطبیق نام خودرو (از ستون «خودروهای سازگار» اکسل) با خودروهای دیتابیس.
// فقط تطبیق دقیق: فرق‌های نوشتاری (ی/ک عربی، نیم‌فاصله، فاصله‌ی اضافه، ارقام
// فارسی، حروف بزرگ/کوچک) نادیده گرفته می‌شن ولی هیچ حدسی زده نمی‌شه.

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function normalizeName(value) {
  return String(value || "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[۰-۹]/g, (d) => PERSIAN_DIGITS.indexOf(d))
    .replace(/[٠-٩]/g, (d) => ARABIC_DIGITS.indexOf(d))
    .replace(/[‌\s]+/g, " ")
    .trim()
    .toLowerCase();
}

// لیست خودروهای یک خانه‌ی اکسل؛ جداکننده: کاما، ویرگول فارسی، نقطه‌ویرگول یا خط جدید
function splitVehicleNames(value) {
  return String(value || "")
    .split(/[,،;؛\n]/)
    .map((name) => name.trim())
    .filter(Boolean);
}

// نام نرمال‌شده ← خودروها. هر خودرو با نام خودش، نام انگلیسی، و «برند + نام»
// (فارسی و انگلیسی) پیدا می‌شه.
function buildVehicleNameIndex(vehicles) {
  const index = new Map();

  const add = (key, vehicle) => {
    const normalized = normalizeName(key);

    if (!normalized) return;

    if (!index.has(normalized)) index.set(normalized, new Set());

    index.get(normalized).add(vehicle);
  };

  vehicles.forEach((vehicle) => {
    add(vehicle.name, vehicle);
    add(vehicle.nameEn, vehicle);

    if (vehicle.name) add(`${vehicle.brand} ${vehicle.name}`, vehicle);
    if (vehicle.nameEn && vehicle.brandEn) add(`${vehicle.brandEn} ${vehicle.nameEn}`, vehicle);
  });

  return {
    find: (name) => [...(index.get(normalizeName(name)) || [])],
  };
}

module.exports = { normalizeName, splitVehicleNames, buildVehicleNameIndex };
