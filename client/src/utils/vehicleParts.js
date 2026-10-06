import getRecommendedOils from "./vehicleOils";
import getMenuCategorySlug from "./classifyMenuCategory";

// دسته‌های دکمه‌های صفحه‌ی خودرو. specific یعنی محصولش مخصوص خودروئه و فقط
// از لینک‌های ایمپورت اکسل (productLinks) میاد؛ بقیه (ضدیخ، آب رادیاتور،
// شیشه‌شور) اگه لینک مشخص نداشته باشن همه‌ی محصولات فعال اون دسته نشون داده می‌شن.
export const VEHICLE_PARTS = [
  { key: "oil", icon: "🛢️" },
  { key: "filter", icon: "🧰", slug: null, specific: true },
  { key: "gearboxFilter", icon: "⚙️", slug: "gearbox-filter", specific: true },
  { key: "antifreeze", icon: "❄️", slug: "antifreeze" },
  { key: "coolant", icon: "💧", slug: "coolant" },
  { key: "washer", icon: "🧽", slug: "windshield-washer" },
];

const PART_SLUGS = VEHICLE_PARTS.map((part) => part.slug).filter(Boolean);

// محصولات هر دسته برای یک خودرو: { oil: { main, alt }, filter: [], ... }
export function getVehicleParts(vehicle, products) {
  const active = products.filter((product) => product.isActive !== false);
  const { main, alt, filters } = getRecommendedOils(vehicle, products);

  const bySku = new Map(
    active.map((product) => [String(product.sku || "").toUpperCase(), product]),
  );
  const linked = [...(vehicle.productLinks || [])]
    .sort((a, b) => a.priority - b.priority)
    .map((link) => bySku.get(String(link.sku).toUpperCase()))
    .filter(Boolean);

  const isOther = (product) => PART_SLUGS.includes(getMenuCategorySlug(product));
  const ofSlug = (list, slug) =>
    list.filter((product) => getMenuCategorySlug(product) === slug);

  const result = {
    oil: {
      main: main.filter((product) => !isOther(product)),
      alt: alt.filter((product) => !isOther(product)),
    },
    filter: filters.filter((product) => !isOther(product)),
  };

  VEHICLE_PARTS.filter((part) => part.slug).forEach((part) => {
    const own = [...new Set(ofSlug(linked, part.slug))];
    result[part.key] = own.length || part.specific ? own : ofSlug(active, part.slug);
  });

  return result;
}

// همه‌ی محصولات یک دسته به شکل آرایه‌ی تخت (برای شمارش و عکس دکمه)
export function partProducts(parts, key) {
  return key === "oil" ? [...parts.oil.main, ...parts.oil.alt] : parts[key] || [];
}

export default getVehicleParts;
