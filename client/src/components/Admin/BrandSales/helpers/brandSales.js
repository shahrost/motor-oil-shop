export function closedBrandNames(rows) {
  return rows.filter((row) => row.closed).map((row) => row.brand);
}

export function brandNames(products, closedBrands) {
  return [...new Set([...products.map((product) => product.brand), ...closedBrands])]
    .filter(Boolean).sort((a, b) => a.localeCompare(b, "fa"));
}

export function updateClosedBrands(previous, saved) {
  return [...previous.filter((brand) => brand !== saved.brand), ...(saved.closed ? [saved.brand] : [])];
}
