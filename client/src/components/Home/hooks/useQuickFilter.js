import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getBrands,
  getViscosities,
  getVolumes,
  getApiOptions,
  getPriceOptions,
} from "../../../utils/productFilters";
import { getProductTypeOptions } from "../../../utils/classifyProductType";

const withoutAll = (options) => options.filter((item) => item.value !== "همه");

const EMPTY_VALUES = {
  viscosity: "",
  api: "",
  volume: "",
  brand: "",
  productType: "",
  priceOption: "",
};

// فیلدهای فیلتر سریع (به ترتیب نمایش: ردیف اول گرید/API/لیتراژ، ردیف دوم برند/نوع/قیمت)
// و ساخت آدرس صفحه‌ی محصولات از مقادیر انتخاب‌شده
function useQuickFilter(language, t) {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_VALUES);

  const fields = [
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

  function setValue(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function submit() {
    const params = new URLSearchParams();

    ["brand", "viscosity", "volume", "api", "productType"].forEach((key) => {
      if (values[key]) params.set(key, values[key]);
    });

    const { priceOption } = values;

    if (priceOption.startsWith("sort:")) {
      params.set("sort", priceOption.replace("sort:", ""));
    } else if (priceOption.startsWith("range:")) {
      params.set("priceRange", priceOption.replace("range:", ""));
    }

    navigate(`/products?${params.toString()}`);
  }

  return { fields, values, setValue, submit };
}

export default useQuickFilter;
