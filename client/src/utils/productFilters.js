import brands from "../data/brands";
import viscosities from "../data/productOptions/viscosities";
import volumes from "../data/productOptions/volumes";
import priceRanges from "../data/productOptions/priceRanges";

export function getBrands() {
  return ["همه", ...brands.map((brand) => brand.name)];
}

export function getViscosities() {
  return ["همه", ...viscosities];
}

export function getVolumes() {
  return ["همه", ...volumes];
}

export function getPriceOptions() {
  return [
    { value: "", label: "همه" },
    { value: "sort:cheap", label: "ارزان‌ترین به گران‌ترین" },
    { value: "sort:expensive", label: "گران‌ترین به ارزان‌ترین" },
    ...priceRanges.map((range) => ({
      value: `range:${range.id}`,
      label: range.label,
    })),
  ];
}
