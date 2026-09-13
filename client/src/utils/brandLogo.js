import brands from "../data/brands";

// Fallback image for a broken/missing product photo: show the brand's own
// logo instead of a broken-image icon.
export function getBrandLogo(brandName) {
  const brand = brands.find((item) => item.name === brandName);

  return brand?.image || "";
}

export default getBrandLogo;
