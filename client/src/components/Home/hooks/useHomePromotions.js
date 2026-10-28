import { useContext, useMemo } from "react";

import { ProductContext } from "../../../context";
import LanguageContext from "../../../context/LanguageContext";
import groupPromotions from "../helpers/groupPromotions";

// گروه‌های طرح فروش فعال برای بنر صفحه‌ی اصلی (همون منبع صفحه‌ی /promotions)
function useHomePromotions() {
  const { products } = useContext(ProductContext);
  const { t } = useContext(LanguageContext);

  return useMemo(() => groupPromotions(products, t), [products, t]);
}

export default useHomePromotions;
