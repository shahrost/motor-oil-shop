import ProductCard, { ProductCardSkeleton } from "../ProductCard";
import BrandSaleNotice from "../common/BrandSaleNotice";
import useBrandProductsPage from "./hooks/useBrandProductsPage";

function BrandProducts() {
  const { t, brandLabel, filteredProducts, waiting, salesClosed } = useBrandProductsPage();

  return (
    <div className="px-5 mt-8 mb-16">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center">
          {t("brandProducts.title")} {brandLabel}
        </h1>

        <p className={`text-center mt-3 text-gray-600 ${waiting ? "invisible" : ""}`}>
          {filteredProducts.length} {t("common.productsAvailable")}
        </p>

        {salesClosed && <BrandSaleNotice brand={brandLabel} className="mt-4" />}
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
