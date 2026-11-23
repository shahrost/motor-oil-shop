import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext";
import LanguageContext from "../../../context/LanguageContext";
import menuCategories from "../../../data/menuCategories";
import { getMenuCategorySlug } from "../../../utils/classifyMenuCategory";
import { usePageMeta } from "../../../hooks/usePageMeta";

export default function useCategoryProductsPage() {
  const { category } = useParams();
  const { products } = useContext(ProductContext);
  const { language, t } = useContext(LanguageContext);
  const info = menuCategories.find((item) => item.slug === category);
  const categoryLabel = info ? (language === "en" ? info.labelEn : info.label) : "";
  const filteredProducts = useMemo(
    () => products.filter((product) => getMenuCategorySlug(product) === category),
    [products, category],
  );
  usePageMeta(categoryLabel, t("meta.category").replace("{name}", categoryLabel));
  return { t, categoryLabel, filteredProducts };
}
