import { useMemo } from "react";
import brandsData from "../../../../data/brands";
import { hasProductPrice } from "../../../../utils/productPrice";

const hasPrice = (product) =>
  hasProductPrice(product, "cash") || hasProductPrice(product, "check");

// محصولات به ترتیب برندهای تعریف‌شده گروه‌بندی می‌شن؛ برند بدون محصول حذف می‌شه
function useBrandRows(products) {
  return useMemo(
    () =>
      brandsData
        .map((brand) => ({
          brand,
          // فقط داخل همین ردیف: قیمت‌دارها اول، استعلامی‌ها آخر؛ ترتیب هر گروه حفظ می‌شود.
          items: products
            .filter((product) => product.brand === brand.name)
            .sort((a, b) => Number(hasPrice(b)) - Number(hasPrice(a))),
        }))
        .filter((row) => row.items.length > 0),
    [products],
  );
}

export default useBrandRows;
