import brands from "../data/brands";

function getBrandLabel(nameFa, language) {
  if (language !== "en") return nameFa;

  const brand = brands.find((item) => item.name === nameFa);

  return brand?.nameEn || nameFa;
}

export default getBrandLabel;
