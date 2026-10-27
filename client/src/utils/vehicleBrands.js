import { normalizeSearchText, searchWords } from "./searchText";
import VEHICLE_PRIORITY_BRANDS from "../data/vehiclePriorityBrands";
import VEHICLE_ALIASES from "../data/vehicleAliases";

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

// برندهای داخلی/پرفروش (data/vehiclePriorityBrands) اول و به همون ترتیب، بقیه به ترتیب قبلی (تعداد مدل)
export function sortVehicleBrands(brands) {
  const priority = (brand) => {
    const index = VEHICLE_PRIORITY_BRANDS.indexOf(brand.name);
    return index === -1 ? VEHICLE_PRIORITY_BRANDS.length : index;
  };

  return [...brands].sort((a, b) => priority(a) - priority(b));
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

// اسم‌های جایگزین (data/vehicleAliases): «پراید» ← «سایپا ۱۳۱» و…؛ کلید یکسان‌شده یک بار ساخته می‌شه
const ALIASES = VEHICLE_ALIASES.map(({ keys, targets }) => ({
  keys: keys.map(normalizeSearchText),
  targets: targets.map(normalizeSearchText),
}));

// عبارت‌های جایگزین جستجو: کلید alias داخل عبارت (به‌صورت کلمه‌ی کامل) با هر target عوض می‌شه
function getAliasWordLists(query) {
  const padded = ` ${query} `;

  return ALIASES.flatMap(({ keys, targets }) => {
    const key = keys.find((item) => padded.includes(` ${item} `));

    return key
      ? targets.map((target) => padded.replace(` ${key} `, ` ${target} `).trim().split(" "))
      : [];
  });
}

const hasAllWords = (haystack, words) => words.every((word) => haystack.includes(word));

export function searchVehicles(vehicles, search) {
  const words = searchWords(search);

  if (words.length === 0) return vehicles;

  const query = words.join(" ");
  const aliasWordLists = getAliasWordLists(query);
  const ranked = [];

  vehicles.forEach((vehicle) => {
    const { names, brands, haystack } = getSearchText(vehicle);

    if (!hasAllWords(haystack, words)) {
      // فقط با اسم جایگزین پیدا شد ← بعد از خودروهایی که نامشون با عبارت شروع می‌شه
      if (aliasWordLists.some((list) => hasAllWords(haystack, list))) {
        ranked.push({ vehicle, rank: 1.5 });
      }
      return;
    }

    let rank = 3;

    if (brands.some((brand) => brand.startsWith(query))) rank = 0;
    else if (names.some((name) => name.startsWith(query))) rank = 1;
    else if (names.some((name) => name.split(" ").some((part) => part.startsWith(words[0])))) rank = 2;

    ranked.push({ vehicle, rank });
  });

  return ranked.sort((a, b) => a.rank - b.rank).map((item) => item.vehicle);
}

// برندهایی که نام فارسی یا انگلیسی‌شون شامل همه‌ی کلمه‌های جستجو (یا اسم جایگزینش) باشه
export function searchVehicleBrands(brands, search) {
  const words = searchWords(search);

  if (words.length === 0) return brands;

  const wordLists = [words, ...getAliasWordLists(words.join(" "))];

  return brands.filter((brand) => {
    const haystack = `${normalizeSearchText(brand.name)} ${normalizeSearchText(brand.nameEn)}`;

    return wordLists.some((list) => hasAllWords(haystack, list));
  });
}

export default getVehicleBrands;
