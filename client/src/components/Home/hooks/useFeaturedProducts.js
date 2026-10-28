import { useContext, useMemo } from "react";

import { ProductContext } from "../../../context";
import FEATURED_PRODUCTS, { FEATURED_AUTO_COUNT } from "../../../data/featuredProducts";
import pickFeaturedProducts from "../helpers/pickFeaturedProducts";

// محصولات «پیشنهادی» صفحه‌ی اصلی + وضعیت لود (برای اسکلت کارت‌ها)
function useFeaturedProducts() {
  const { products, loading } = useContext(ProductContext);

  const featured = useMemo(
    () => pickFeaturedProducts(products, FEATURED_PRODUCTS, FEATURED_AUTO_COUNT),
    [products],
  );

  return { featured, loading };
}

export default useFeaturedProducts;
