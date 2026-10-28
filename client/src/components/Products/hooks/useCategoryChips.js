import { useContext, useMemo } from "react";

import { ProductContext } from "../../../context";
import menuCategories from "../../../data/menuCategories";
import { getMenuCategorySlug } from "../../../utils/classifyMenuCategory";

// دسته‌های ردیف «دسته‌های سریع» (همون فهرست منوی محصولات)؛ بعد از رسیدن محصولات
// دسته‌ی بی‌محصول حذف می‌شه تا دکمه به صفحه‌ی خالی نبره
function useCategoryChips() {
  const { products } = useContext(ProductContext);

  return useMemo(() => {
    if (products.length === 0) return menuCategories;

    const slugs = new Set(products.map(getMenuCategorySlug));

    return menuCategories.filter((category) => slugs.has(category.slug));
  }, [products]);
}

export default useCategoryChips;
