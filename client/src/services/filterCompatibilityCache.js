import { fetchFilterCompatibility } from "./vehicleService";

// یک درخواست برای همه‌ی کارت‌ها؛ نتیجه در حافظه می‌مونه و در صورت خطا
// دفعه‌ی بعد دوباره تلاش می‌شه
let cached = null;
let pending = null;

export function getCachedCompatibility() {
  return cached;
}

export function loadCompatibility() {
  if (cached) return Promise.resolve(cached);

  if (!pending) {
    pending = fetchFilterCompatibility()
      .then((data) => {
        cached = data;

        return data;
      })
      .finally(() => {
        pending = null;
      });
  }

  return pending;
}
