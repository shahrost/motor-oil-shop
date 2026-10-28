import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import ProductCard from "../../ProductCard";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import HomeSectionHeader from "./HomeSectionHeader";

// «محصولات پیشنهادی» با کارت محصول؛ موبایل ۲ ستون، تبلت ۳، دسکتاپ ۴
function FeaturedProducts() {
  const { t } = useContext(LanguageContext);
  const { featured } = useFeaturedProducts();

  if (featured.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <HomeSectionHeader
        title={t("home.featured.title")}
        to="/products"
        linkLabel={t("home.featured.viewAll")}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
