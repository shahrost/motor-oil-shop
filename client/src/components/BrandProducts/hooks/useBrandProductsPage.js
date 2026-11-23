import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext";
import LanguageContext from "../../../context/LanguageContext";
import getBrandLabel from "../../../utils/brandLabel";
import { usePageMeta } from "../../../hooks/usePageMeta";

export default function useBrandProductsPage() {
  const { brand } = useParams();
  const { products, loading } = useContext(ProductContext);
  const { language, t } = useContext(LanguageContext);
  const brandLabel = getBrandLabel(brand, language);
  const filteredProducts = useMemo(() => products.filter((product) => product.brand === brand), [products, brand]);
  usePageMeta(`${t("brandProducts.title")} ${brandLabel}`, t("meta.brand").replace("{name}", brandLabel));

  return { t, brandLabel, filteredProducts, waiting: loading && products.length === 0,
    salesClosed: filteredProducts.some((product) => product.salesClosed) };
}
