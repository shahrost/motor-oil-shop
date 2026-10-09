import { useMemo } from "react";
import brandsData from "../../../../data/brands";

// محصولات به ترتیب برندهای تعریف‌شده گروه‌بندی می‌شن؛ برند بدون محصول حذف می‌شه
function useBrandRows(products) {
  return useMemo(
    () =>
      brandsData
        .map((brand) => ({
          brand,
          items: products.filter((product) => product.brand === brand.name),
        }))
        .filter((row) => row.items.length > 0),
    [products],
  );
}

export default useBrandRows;
