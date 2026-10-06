import vehicleMakers from "../data/vehicleMakers";

// حذف فاصله و نیم‌فاصله و یکسان‌سازی ی/ک عربی برای مقایسه‌ی مقدار maker
function normalizeMaker(value) {
  return (value || "")
    .replace(/[\s‌]/g, "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک");
}

// خودروساز داخلیِ یک خودرو (یا null اگه داخلی نباشه)
export function findVehicleMaker(vehicle) {
  const maker = normalizeMaker(vehicle.maker);

  if (!maker) return null;

  return vehicleMakers.find((m) => m.keys.some((key) => maker.includes(key))) || null;
}

function addBrand(map, vehicle) {
  const entry = map.get(vehicle.brand);

  if (entry) {
    entry.count += 1;
  } else {
    map.set(vehicle.brand, {
      name: vehicle.brand,
      nameEn: vehicle.brandEn || vehicle.brand,
      count: 1,
    });
  }
}

const byCountDesc = (a, b) => b.count - a.count;

// ساختار دوبخشی منوی خودروها:
// - domestic: خودروسازان داخلی (به ترتیب vehicleMakers) و برندهای زیرمجموعه‌ی هرکدام
// - foreign: بقیه‌ی خودروها بر اساس برند (برندهای تکراری بین گروه‌ها یکی می‌شن)
export function getVehicleMenuGroups(vehicles) {
  const makerBrands = new Map(vehicleMakers.map((m) => [m.slug, new Map()]));
  const foreign = new Map();

  vehicles.forEach((vehicle) => {
    const maker = findVehicleMaker(vehicle);

    addBrand(maker ? makerBrands.get(maker.slug) : foreign, vehicle);
  });

  return {
    domestic: vehicleMakers
      .map((maker) => ({
        ...maker,
        brands: [...makerBrands.get(maker.slug).values()].sort(byCountDesc),
      }))
      .filter((maker) => maker.brands.length > 0),
    foreign: [...foreign.values()].sort(byCountDesc),
  };
}

// آدرس صفحه‌ی برند؛ با maker فقط خودروهای همون خودروساز، بدونش فقط خودروهای غیرداخلی
export function vehicleBrandPath(brand, makerSlug) {
  const base = `/vehicles/${encodeURIComponent(brand)}`;

  return makerSlug ? `${base}?maker=${makerSlug}` : `${base}?group=foreign`;
}

// فیلتر خودروهای صفحه‌ی برند بر اساس پارامترهای آدرس (maker / group)
export function filterBrandVehicles(vehicles, brand, { makerSlug, foreignOnly }) {
  return vehicles.filter((vehicle) => {
    if (vehicle.brand !== brand) return false;

    const maker = findVehicleMaker(vehicle);

    if (makerSlug) return maker?.slug === makerSlug;
    if (foreignOnly) return !maker;

    return true;
  });
}

export default getVehicleMenuGroups;
