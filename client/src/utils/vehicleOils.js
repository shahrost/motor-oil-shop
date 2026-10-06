import { normalizeViscosity } from "./normalizeSpec";
import getMenuCategorySlug from "./classifyMenuCategory";

const ALT_KIND = "جایگزین";
const FILTER_KIND = "فیلتر";

// روغن‌ها و فیلترهای مناسب یک خودرو: { main, alt, filters }
// - اگه خودرو از ایمپورت اکسل لیست محصولات مشخص (productLinks) داشته باشه، همون
//   محصولات به ترتیب اولویت نشون داده می‌شن (محصولاتی که توی سایت نیستن رد می‌شن).
//   نوع توصیه: «اصلی» ← main، «جایگزین» ← alt، «فیلتر» ← filters.
// - وگرنه روغن موتورهای بنزینیِ فعال که ویسکوزیته‌شون جزو ویسکوزیته‌های پیشنهادی
//   خودرو باشه.
export function getRecommendedOils(vehicle, products) {
  if (!vehicle) return { main: [], alt: [], filters: [] };

  const active = products.filter((product) => product.isActive !== false);

  if (vehicle.productLinks?.length) {
    const bySku = new Map(
      active.map((product) => [String(product.sku || "").toUpperCase(), product]),
    );

    const main = [];
    const alt = [];
    const filters = [];

    [...vehicle.productLinks]
      .sort((a, b) => a.priority - b.priority)
      .forEach((link) => {
        const product = bySku.get(String(link.sku).toUpperCase());

        if (!product) return;

        if (link.kind === FILTER_KIND) filters.push(product);
        else (link.kind === ALT_KIND ? alt : main).push(product);
      });

    return { main, alt, filters };
  }

  const wanted = vehicle.viscosities.map(normalizeViscosity);

  return {
    main: active.filter(
      (product) =>
        getMenuCategorySlug(product) === "gasoline-engine-oil" &&
        wanted.includes(normalizeViscosity(product.viscosity)),
    ),
    alt: [],
    filters: [],
  };
}

export default getRecommendedOils;
