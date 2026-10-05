import { useState } from "react";
import { useNavigate } from "react-router-dom";

import getFilterFields from "../../../utils/filterFields";

const EMPTY_VALUES = {
  viscosity: "",
  api: "",
  volume: "",
  brand: "",
  productType: "",
  priceOption: "",
};

// مقادیر فیلتر سریع و ساخت آدرس صفحه‌ی محصولات از مقادیر انتخاب‌شده
function useQuickFilter(language, t) {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_VALUES);

  const fields = getFilterFields(language, t);

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
