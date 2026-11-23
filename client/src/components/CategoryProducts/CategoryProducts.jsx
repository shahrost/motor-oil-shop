import ProductRows from "../common/ProductRows";
import useCategoryProductsPage from "./hooks/useCategoryProductsPage";

function CategoryProducts() {
  const { t, categoryLabel, filteredProducts } = useCategoryProductsPage();

  return (
    <div className="px-5 mt-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-black">
          {categoryLabel}
        </h1>

        <p className="text-center mt-3 text-gray-600">
          {filteredProducts.length} {t("common.productsAvailable")}
        </p>

        <div className="mt-10">
          <ProductRows
            products={filteredProducts}
            notFoundKey="categoryProducts.notFound"
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
