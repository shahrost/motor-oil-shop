// خودروهایی که این مرورگر بهشون امتیاز داده: { "<شناسه‌ی خودرو>": امتیاز }
// (تا فرم دوباره نشون داده نشه؛ جلوگیری اصلی از اسپم با محدودیت سرور است)
const STORAGE_KEY = "ratedVehicles";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function getMyVehicleRating(vehicleId) {
  return readAll()[vehicleId] || 0;
}

export function saveMyVehicleRating(vehicleId, rating) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...readAll(), [vehicleId]: rating }),
    );
  } catch {
    // حالت خصوصی مرورگر: فقط تا رفرش یادش نمی‌مونه
  }
}
