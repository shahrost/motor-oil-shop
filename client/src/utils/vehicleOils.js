import { normalizeViscosity } from "./normalizeSpec";
import getMenuCategorySlug from "./classifyMenuCategory";

// روغن موتورهای بنزینیِ فعال که ویسکوزیته‌شون جزو ویسکوزیته‌های پیشنهادی خودرو باشه.
export function getRecommendedOils(vehicle, products) {
  if (!vehicle) return [];

  const wanted = vehicle.viscosities.map(normalizeViscosity);

  return products.filter(
    (product) =>
      product.isActive !== false &&
      getMenuCategorySlug(product) === "gasoline-engine-oil" &&
      wanted.includes(normalizeViscosity(product.viscosity)),
  );
}

export default getRecommendedOils;
