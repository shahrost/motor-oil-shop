import brands from "../../../data/brands";
import viscosities from "../../../data/productOptions/viscosities";
import volumes from "../../../data/productOptions/volumes";
import priceRanges from "../../../data/productOptions/priceRanges";
import apiStandards from "../../../data/productOptions/api";
import productTypes from "../../../data/productOptions/productTypes";
import localizedLabel from "../../../utils/localizedLabel";
import { OTHER_TYPE } from "../../../utils/classifyProductType";

// گزینه‌ی «همه» گزینه‌ی لیست نیست؛ با placeholder هر فیلد نشون داده می‌شه (مقدار "")
const sameLabel = (item) => ({ value: item, label: item });

function getPriceOptions(language, t) {
  return [
    { value: "sort:cheap", label: t("products.filters.sortCheap") },
    { value: "sort:expensive", label: t("products.filters.sortExpensive") },
    ...priceRanges.map((range) => ({
      value: `range:${range.id}`,
      label: localizedLabel(range, language),
    })),
  ];
}

// فیلدهای فیلتر صفحه‌ی محصولات.
// ترتیب نمایش: ردیف اول گرید/API/لیتراژ، ردیف دوم برند/نوع/قیمت
function getFilterFields(language, t) {
  const volumeLabels = t("common.volumeLabels");

  return [
    {
      key: "viscosity",
      label: t("common.viscosityLabel"),
      placeholder: t("home.quickFilter.allViscosities"),
      options: viscosities.map(sameLabel),
    },
    {
      key: "api",
      label: t("common.apiLabel"),
      placeholder: t("home.quickFilter.allApis"),
      options: apiStandards.map(sameLabel),
    },
    {
      key: "volume",
      label: t("common.volumeLabel"),
      placeholder: t("home.quickFilter.allVolumes"),
      options: volumes.map((item) => ({ value: item, label: volumeLabels[item] || item })),
    },
    {
      key: "brand",
      label: t("common.brandLabel"),
      placeholder: t("home.quickFilter.allBrands"),
      options: brands.map((brand) => ({
        value: brand.name,
        label: language === "en" ? brand.nameEn : brand.name,
      })),
    },
    {
      key: "productType",
      label: t("common.productTypeLabel"),
      placeholder: t("home.quickFilter.allTypes"),
      options: [...productTypes, OTHER_TYPE].map((type) => ({
        value: type.id,
        label: localizedLabel(type, language),
      })),
    },
    {
      key: "priceOption",
      label: t("common.priceLabel"),
      placeholder: t("products.filters.allPrices"),
      options: getPriceOptions(language, t),
    },
  ];
}

export default getFilterFields;
