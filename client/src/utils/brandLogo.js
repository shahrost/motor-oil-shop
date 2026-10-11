import brands from "../data/brands";
import { getBrandPlaceholder } from "./brandPlaceholder";

// Logo file of a product brand from data/brands.js, or "" when the brand has
// no logo (no placeholder; used by the brand badge on product cards).
export function findBrandLogo(brandName) {
  return brands.find((item) => item.name === brandName)?.image || "";
}

// Fallback image for a broken/missing product photo: show the brand's own
// logo instead of a broken-image icon. A brand without a logo file gets a
// simple placeholder with its name.
export function getBrandLogo(brandName) {
  return findBrandLogo(brandName) || getBrandPlaceholder(brandName);
}

export default getBrandLogo;
