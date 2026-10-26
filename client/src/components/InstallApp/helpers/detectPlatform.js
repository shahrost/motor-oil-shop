// تشخیص نوع گوشی/مرورگر برای راهنمای نصب
export function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

export function detectPlatform() {
  const ua = navigator.userAgent || "";
  // آیپد جدید خودش رو مک معرفی می‌کنه
  const isIos =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIos) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

// مرورگر داخلی تلگرام/اینستاگرام/... امکان نصب نداره
export function isInAppBrowser() {
  return /Telegram|Instagram|FBAN|FBAV|WhatsApp|Line\/|; wv\)/i.test(
    navigator.userAgent || "",
  );
}
