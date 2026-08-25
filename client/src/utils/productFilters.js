import brands from "../data/brands";
import viscosities from "../data/productOptions/viscosities";
import volumes from "../data/productOptions/volumes";
import priceRanges from "../data/productOptions/priceRanges";
import api from "../data/productOptions/api";
import translations from "../i18n/translations";

export function getBrands(language = "fa") {
  return [
    { value: "همه", label: language === "en" ? "All" : "همه" },
    ...brands.map((brand) => ({
      value: brand.name,
      label: language === "en" ? brand.nameEn : brand.name,
    })),
  ];
}

export function getViscosities(language = "fa") {
  return [
    { value: "همه", label: language === "en" ? "All" : "همه" },
    ...viscosities.map((item) => ({ value: item, label: item })),
  ];
}

export function getVolumes(language = "fa") {
  const volumeLabels = translations[language].common.volumeLabels;

  return [
    { value: "همه", label: language === "en" ? "All" : "همه" },
    ...volumes.map((item) => ({
      value: item,
      label: volumeLabels[item] || item,
    })),
  ];
}

export function getApiOptions(language = "fa") {
  return [
    { value: "همه", label: language === "en" ? "All" : "همه" },
    ...api.map((item) => ({ value: item, label: item })),
  ];
}

export function getPriceOptions(language = "fa") {
  return [
    { value: "", label: language === "en" ? "All" : "همه" },
    {
      value: "sort:cheap",
      label:
        language === "en"
          ? "Cheapest to most expensive"
          : "ارزان‌ترین به گران‌ترین",
    },
    {
      value: "sort:expensive",
      label:
        language === "en"
          ? "Most expensive to cheapest"
          : "گران‌ترین به ارزان‌ترین",
    },
    ...priceRanges.map((range) => ({
      value: `range:${range.id}`,
      label: language === "en" ? range.labelEn : range.label,
    })),
  ];
}
