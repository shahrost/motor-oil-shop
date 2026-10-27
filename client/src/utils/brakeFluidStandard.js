import getMenuCategorySlug from "./classifyMenuCategory";

// استاندارد روغن ترمز (DOT3، DOT4، DOT5.1) برای کارت محصول.
// گرید و API روغن ترمز خالیه و استانداردش فقط توی اسم یا توضیحات اومده.
// روغن ترمز ووفر دسته‌ی جدا نداره («انواع روانکارها»)، پس اسم محصول هم چک می‌شه.
const DOT_PATTERN = /\bDOT\s?(\d(?:\.\d)?)/i;

export function isBrakeFluid(product) {
  return (
    getMenuCategorySlug(product) === "brake-fluid" ||
    (product.name || "").includes("ترمز")
  );
}

export function getBrakeFluidStandard(product) {
  const text = [product.viscosity, product.name, product.description]
    .filter(Boolean)
    .join(" ");
  const match = text.match(DOT_PATTERN);
  return match ? `DOT${match[1]}` : "";
}
