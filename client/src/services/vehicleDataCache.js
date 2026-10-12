// کش داده‌ی صفحه‌های خودرو در مرورگر (برندها، مدل‌های یک برند، یک خودرو) تا برگشت به
// صفحه فوری باشه. به ازای هر loader یک Map(ورودی ← نتیجه).
const caches = new Map();

export function getVehicleDataCache(loader) {
  if (!caches.has(loader)) caches.set(loader, new Map());

  return caches.get(loader);
}

// بعد از ایمپورت خودرو در پنل ادمین: صفحه‌های خودرو داده‌ی تازه رو از سرور بگیرن
export function clearVehicleDataCache() {
  caches.clear();
}
