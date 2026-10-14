// لینک موقعیت مشتری روی نقشه؛ روی گوشی مستقیم اپ Google Maps (یا مسیریابی) رو باز می‌کنه
function mapLink(location) {
  if (!location || location.lat == null || location.lng == null) return "";

  return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
}

export default mapLink;
