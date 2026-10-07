// برندهای فیلتر خودرو؛ فقط کارت این برندها لیست خودروهای سازگار نشون می‌ده
// (دسته‌بندی محصولات متن آزاده و برای تشخیص فیلتر قابل اتکا نیست)
const COMPATIBLE_VEHICLE_BRANDS = [
  "فیلتر میهن",
  "فیلتر گیربکس ATFO",
  "فیلتر لوکومبیل",
];

export function showsCompatibleVehicles(product) {
  return Boolean(product?.sku) && COMPATIBLE_VEHICLE_BRANDS.includes(product.brand);
}

// نام خودروهای یک فیلتر به همان شکلی که در «خودروهای من» نوشته می‌شه
// (فارسی، یا انگلیسی با برگشت به فارسی)؛ نام تکراری یک بار می‌آد
export function getCompatibleVehicleNames(vehicles, language) {
  const names = (vehicles || []).map((vehicle) =>
    language === "en" ? vehicle.nameEn || vehicle.name : vehicle.name,
  );

  return [...new Set(names.filter(Boolean))];
}

export default getCompatibleVehicleNames;
