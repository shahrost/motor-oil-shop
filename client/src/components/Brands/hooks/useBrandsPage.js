import { useContext, useMemo } from "react";
import brands from "../../../data/brands";
import LanguageContext from "../../../context/LanguageContext";
import { ProductContext } from "../../../context/ProductContext";
import { usePageMeta } from "../../../hooks/usePageMeta";

export default function useBrandsPage() {
  const { language, t } = useContext(LanguageContext);
  const { products } = useContext(ProductContext);
  const closed = useMemo(
    () => new Set(products.filter((product) => product.salesClosed).map((product) => product.brand)),
    [products],
  );
  usePageMeta(t("brands.title"), t("meta.brands"));
  return { t, closed, brands: brands.map((brand) => ({ ...brand, label: language === "en" ? brand.nameEn : brand.name })) };
}
