import { normalizeViscosity } from "./normalizeSpec";
import getMenuCategorySlug from "./classifyMenuCategory";

const ALT_KIND = "جایگزین";

// روغن‌های مناسب یک خودرو: { main, alt }
// - اگه خودرو از ایمپورت اکسل لیست محصولات مشخص (productLinks) داشته باشه، همون
//   محصولات به ترتیب اولویت نشون داده می‌شن (محصولاتی که توی سایت نیستن رد می‌شن).
// - وگرنه روغن موتورهای بنزینیِ فعال که ویسکوزیته‌شون جزو ویسکوزیته‌های پیشنهادی
//   خودرو باشه.
export function getRecommendedOils(vehicle, products) {
  if (!vehicle) return { main: [], alt: [] };

  const active = products.filter((product) => product.isActive !== false);

  if (vehicle.productLinks?.length) {
    const bySku = new Map(
      active.map((product) => [String(product.sku || "").toUpperCase(), product]),
    );

    const main = [];
    const alt = [];

    [...vehicle.productLinks]
      .sort((a, b) => a.priority - b.priority)
      .forEach((link) => {
        const product = bySku.get(String(link.sku).toUpperCase());

        if (!product) return;

        (link.kind === ALT_KIND ? alt : main).push(product);
      });

    return { main, alt };
  }

  const wanted = vehicle.viscosities.map(normalizeViscosity);

  return {
    main: active.filter(
      (product) =>
        getMenuCategorySlug(product) === "gasoline-engine-oil" &&
        wanted.includes(normalizeViscosity(product.viscosity)),
    ),
    alt: [],
  };
}

export default getRecommendedOils;
