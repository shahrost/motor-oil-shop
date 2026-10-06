// جایگزین ساده برای برندی که لوگو نداره: یک تصویر SVG با نام برند (بدون
// ساختن لوگوی جعلی). مثل لوگوها داخل همون <img> کارت نشون داده می‌شه.
function escapeXml(text) {
  return String(text).replace(/[<>&"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

export function getBrandPlaceholder(brandName) {
  const label = escapeXml(brandName || "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" rx="24" fill="#f9fafb"/><rect x="40" y="110" width="320" height="80" rx="16" fill="none" stroke="#d1d5db" stroke-width="3"/><text x="200" y="162" text-anchor="middle" direction="rtl" font-family="Tahoma, Arial, sans-serif" font-size="34" font-weight="bold" fill="#374151">${label}</text></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default getBrandPlaceholder;
