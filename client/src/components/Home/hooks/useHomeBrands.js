import { useContext, useMemo } from "react";

import { ProductContext } from "../../../context";
import brands from "../../../data/brands";

// برندهای نوار صفحه‌ی اصلی (همون data/brands صفحه‌ی /brands): فقط برندهای لوگودار؛
// بعد از رسیدن محصولات، برند بدون محصول حذف می‌شه تا لینکش به صفحه‌ی خالی نره
function useHomeBrands() {
  const { products } = useContext(ProductContext);

  return useMemo(() => {
    const withLogo = brands.filter((brand) => brand.image);
    if (products.length === 0) return withLogo;

    const stocked = new Set(products.map((product) => product.brand));

    return withLogo.filter((brand) => stocked.has(brand.name));
  }, [products]);
}

export default useHomeBrands;
