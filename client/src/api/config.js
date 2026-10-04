// آدرس API سرور (موقع build از VITE_API_URL خونده می‌شه) و ریشه‌ی سرور برای فایل‌های استاتیک
// مثل عکس‌های /uploads و فایل‌های نمونه‌ی /templates
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");
