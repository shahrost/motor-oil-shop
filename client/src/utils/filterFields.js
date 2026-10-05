import {
  getBrands,
  getViscosities,
  getVolumes,
  getApiOptions,
  getPriceOptions,
} from "./productFilters";
import { getProductTypeOptions } from "./classifyProductType";
import { ALL } from "./filterProducts";

// گزینه‌ی «همه» با placeholder هر فیلد نشون داده می‌شه، نه به‌عنوان گزینه
const withoutAll = (options) => options.filter((item) => item.value !== ALL);

// فیلدهای فیلتر محصولات — مشترک بین فیلتر سریع صفحه‌ی اصلی و صفحه‌ی محصولات.
// ترتیب نمایش: ردیف اول گرید/API/لیتراژ، ردیف دوم برند/نوع/قیمت
function getFilterFields(language, t) {
  return [
    {
      key: "viscosity",
      label: t("common.viscosityLabel"),
      placeholder: t("home.quickFilter.allViscosities"),
      options: withoutAll(getViscosities(language)),
    },
    {
      key: "api",
      label: t("common.apiLabel"),
      placeholder: t("home.quickFilter.allApis"),
      options: withoutAll(getApiOptions(language)),
    },
    {
      key: "volume",
      label: t("common.volumeLabel"),
      placeholder: t("home.quickFilter.allVolumes"),
      options: withoutAll(getVolumes(language)),
    },
    {
      key: "brand",
      label: t("common.brandLabel"),
      placeholder: t("home.quickFilter.allBrands"),
      options: withoutAll(getBrands(language)),
    },
    {
      key: "productType",
      label: t("common.productTypeLabel"),
      placeholder: t("home.quickFilter.allTypes"),
      options: withoutAll(getProductTypeOptions(language)),
    },
    {
      key: "priceOption",
      label: t("common.priceLabel"),
      options: getPriceOptions(language),
    },
  ];
}

export default getFilterFields;
