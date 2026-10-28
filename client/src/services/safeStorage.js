// localStorage با try/catch: در حالت خصوصی بعضی مرورگرها، WebView اپ با ذخیره‌سازی بسته یا
// حافظه‌ی پر، هر دسترسی خطا می‌ده و بدون این، کل سایت موقع لود سفید می‌شد.
// اون موقع خوندن null برمی‌گردونه و نوشتن بی‌صدا انجام نمی‌شه (سایت بدون حافظه کار می‌کنه).
// همه‌ی services/*Storage.js از همین استفاده می‌کنن تا جای ذخیره (مثلاً Capacitor Preferences
// در اپ موبایل) فقط اینجا عوض بشه.

export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ذخیره‌سازی در دسترس نیست
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ذخیره‌سازی در دسترس نیست
  }
}
