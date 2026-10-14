// تنظیمات نقشه‌ی انتخاب موقعیت تحویل (Leaflet + کاشی‌های OpenStreetMap)

// وسط محدوده‌ی تحویل (پرند / رباط کریم / نسیم شهر) — قبل از اینکه مشتری موقعیتی انتخاب کنه
export const DEFAULT_CENTER = [35.5, 51.05];
export const DEFAULT_ZOOM = 11;

// زوم بعد از پیدا شدن موقعیت GPS یا وقتی موقعیت قبلاً انتخاب شده
export const PICKED_ZOOM = 17;

export const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
};

// شش رقم اعشار ≈ دقت ۱۰ سانتی‌متر؛ بیشتر فقط حجم اضافه‌ست
export function toLocation(latLng) {
  return {
    lat: Number(latLng.lat.toFixed(6)),
    lng: Number(latLng.lng.toFixed(6)),
  };
}

// کد خطای Geolocation → کلید ترجمه (order.customerInfo.location.*)
export function geoErrorKey(error) {
  if (!window.isSecureContext) return "insecure";
  if (error?.code === 1) return "denied";
  if (error?.code === 3) return "timeout";
  return "unavailable";
}
