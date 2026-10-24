import { normalizeSearchText, searchWords } from "./searchText";

// لیست برندهای خودرو برای صفحه‌ی «خودروهای من»: هر برند یک بار
// (بدون توجه به خودروساز/واردکننده)، به ترتیب تعداد مدل‌ها
export function getVehicleBrands(vehicles) {
  const brands = new Map();

  vehicles.forEach((vehicle) => {
    const entry = brands.get(vehicle.brand);

    if (entry) {
      entry.count += 1;
    } else {
      brands.set(vehicle.brand, {
        name: vehicle.brand,
        nameEn: vehicle.brandEn || vehicle.brand,
        count: 1,
      });
    }
  });

  return [...brands.values()].sort((a, b) => b.count - a.count);
}

// آدرس صفحه‌ی مدل‌های یک برند
export function vehicleBrandPath(brand) {
  return `/vehicles/${encodeURIComponent(brand)}`;
}

// خودروهایی که همه‌ی کلمه‌های جستجو در نام یا برندشون (فارسی یا انگلیسی) باشه؛
// اول خودروهای برندی که نامش با عبارت جستجو شروع می‌شه («کیا» ← کیا، نه کی‌ام‌سی)، بعد
// خودروهایی که نامشون با عبارت شروع می‌شه، بعد اونایی که یک کلمه‌ی نامشون با کلمه‌ی اول
// شروع می‌شه، بعد بقیه (هر گروه به ترتیب قبلی)
// متن یکسان‌شده‌ی هر خودرو یک بار ساخته می‌شه (هر حرف تایپ‌شده دوباره نمی‌سازدش)
const searchTexts = new WeakMap();

function getSearchText(vehicle) {
  if (!searchTexts.has(vehicle)) {
    const names = [normalizeSearchText(vehicle.name), normalizeSearchText(vehicle.nameEn)];
    const brands = [normalizeSearchText(vehicle.brand), normalizeSearchText(vehicle.brandEn)];

    searchTexts.set(vehicle, {
      names,
      brands,
      haystack: `${names.join(" ")} ${brands.join(" ")}`,
    });
  }

  return searchTexts.get(vehicle);
}

export function searchVehicles(vehicles, search) {
  const words = searchWords(search);

  if (words.length === 0) return vehicles;

  const query = words.join(" ");
  const ranked = [];

  vehicles.forEach((vehicle) => {
    const { names, brands, haystack } = getSearchText(vehicle);

    if (!words.every((word) => haystack.includes(word))) return;

    let rank = 3;

    if (brands.some((brand) => brand.startsWith(query))) rank = 0;
    else if (names.some((name) => name.startsWith(query))) rank = 1;
    else if (names.some((name) => name.split(" ").some((part) => part.startsWith(words[0])))) rank = 2;

    ranked.push({ vehicle, rank });
  });

  return ranked.sort((a, b) => a.rank - b.rank).map((item) => item.vehicle);
}

// برندهایی که نام فارسی یا انگلیسی‌شون شامل همه‌ی کلمه‌های جستجو باشه
export function searchVehicleBrands(brands, search) {
  const words = searchWords(search);

  if (words.length === 0) return brands;

  return brands.filter((brand) => {
    const haystack = `${normalizeSearchText(brand.name)} ${normalizeSearchText(brand.nameEn)}`;

    return words.every((word) => haystack.includes(word));
  });
}

export default getVehicleBrands;
