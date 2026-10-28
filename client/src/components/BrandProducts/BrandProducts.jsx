import { useParams } from "react-router-dom";
import { useContext } from "react";

import { ProductContext } from "../../context";
import ProductCard, { ProductCardSkeleton } from "../ProductCard";
import LanguageContext from "../../context/LanguageContext";
import getBrandLabel from "../../utils/brandLabel";
import { usePageMeta } from "../../hooks/usePageMeta";

function BrandProducts() {
  const { brand } = useParams();

  const { products, loading } = useContext(ProductContext);
  // تا اولین پاسخ سرور اسکلت کارت‌ها، نه «۰ محصول» و «پیدا نشد»
  const waiting = loading && products.length === 0;
  const { language, t } = useContext(LanguageContext);
  const brandLabel = getBrandLabel(brand, language);
  usePageMeta(`${t("brandProducts.title")} ${brandLabel}`, t("meta.brand").replace("{name}", brandLabel));

  const filteredProducts = products.filter(
    (product) => product.brand === brand,
  );

  return (
    <div className="px-5 mt-8 mb-16">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center">
          {t("brandProducts.title")} {brandLabel}
        </h1>

        <p className={`text-center mt-3 text-gray-600 ${waiting ? "invisible" : ""}`}>
          {filteredProducts.length} {t("common.productsAvailable")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-10">
          {waiting
            ? Array.from({ length: 10 }, (_, index) => <ProductCardSkeleton key={index} />)
            : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        {!waiting && filteredProducts.length === 0 && (
          <p className="text-center text-red-500 mt-10 font-bold">
            {t("brandProducts.notFound")}
          </p>
        )}
      </section>
    </div>
  );
}

export default BrandProducts;
