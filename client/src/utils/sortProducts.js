import {
  normalizeViscosity,
  normalizeApi,
  compareVolumes,
} from "./normalizeSpec";

// Most of the catalog was shortened to one generic name per category (e.g.
// "معدنی"), so it's identical across volumes and useless for grouping. A few
// brands (Behtam) still carry their real Latin model name with the volume
// baked in ("RENOVATION SL 10W40 1L" / "... 5L") — strip that trailing
// volume so different volumes of the same model line share a key, without
// merging genuinely different lines (e.g. QUANTIC vs RENOVATION) that
// happen to share a grade.
function stripTrailingVolume(name) {
  return (name || "")
    .trim()
    .toLowerCase()
    .replace(/\s*\d+(\.\d+)?\s*(l|cc|kg|g|lb)\s*$/i, "");
}

// Products of the same brand + category (e.g. motorcycle oil, gear oil) form a
// visual cluster; within that cluster, same line + grade + standards belong
// together and should be listed together, ordered by volume.
export function getProductGroupKey(product) {
  return [
    product.brand,
    (product.category || "").trim().toLowerCase(),
    stripTrailingVolume(product.name),
    normalizeViscosity(product.viscosity),
    normalizeApi(product.api),
    normalizeApi(product.acea),
    (product.oilType || "").trim().toLowerCase(),
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
