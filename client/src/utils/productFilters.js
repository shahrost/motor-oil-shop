export function getBrands(products) {
  return [
    "همه",
    ...new Set(
      products.map((p) => p.brand).filter(Boolean)
    ),
  ];
}


export function getViscosities(products) {
  return [
    "همه",
    ...new Set(
      products.map((p) => p.viscosity).filter(Boolean)
    ),
  ];
}


export function getVolumes(products) {
  return [
    "همه",
    ...new Set(
      products.map((p) => p.volume).filter(Boolean)
    ),
  ];
}