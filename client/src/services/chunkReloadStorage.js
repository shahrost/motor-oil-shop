// زمان آخرین رفرش خودکار به‌خاطر فایل گم‌شده‌ی صفحه (utils/lazyPage)؛
// sessionStorage تا اگه فایل واقعاً خراب بود، رفرش پشت سر هم تکرار نشه
const STORAGE_KEY = "chunkReloadAt";

export function getLastChunkReload() {
  try {
    return Number(sessionStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function markChunkReload() {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // بدون sessionStorage (حالت خصوصی سخت‌گیر) فقط رفرش نگه داشته نمی‌شه
  }
}
