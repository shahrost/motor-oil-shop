import {
  normalizeViscosity,
  normalizeApi,
  compareVolumes,
} from "./normalizeSpec";

// Products with the same brand + grade (viscosity) + standards belong to the
// same "line" and should be listed together, ordered by volume.
export function getProductGroupKey(product) {
  return [
    product.brand,
    normalizeViscosity(product.viscosity),
    normalizeApi(product.api),
    normalizeApi(product.acea),
    (product.oilType || "").trim().toLowerCase(),
    (product.category || "").trim().toLowerCase(),
  ].join("|");
}

// Default listing order: group same-line products together, smallest volume first.
export function sortProductsDefault(products) {
  return [...products].sort((a, b) => {
    const keyA = getProductGroupKey(a);
    const keyB = getProductGroupKey(b);

    if (keyA !== keyB) {
      return keyA < keyB ? -1 : 1;
    }

    return compareVolumes(a.volume, b.volume);
  });
}
