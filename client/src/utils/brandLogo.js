import brands from "../data/brands";
import { getBrandPlaceholder } from "./brandPlaceholder";

// Fallback image for a broken/missing product photo: show the brand's own
// logo instead of a broken-image icon. A brand without a logo file gets a
// simple placeholder with its name.
export function getBrandLogo(brandName) {
  const brand = brands.find((item) => item.name === brandName);

  return brand?.image || getBrandPlaceholder(brandName);
}

export default getBrandLogo;
