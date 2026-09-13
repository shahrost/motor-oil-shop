import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";
import menuCategories from "../../data/menuCategories";
import { getMenuCategorySlug } from "../../utils/classifyMenuCategory";
import ProductRows from "../common/ProductRows";

function CategoryProducts() {
  const { category } = useParams();
  const { products } = useContext(ProductContext);
  const { language, t } = useContext(LanguageContext);

  const categoryInfo = menuCategories.find((item) => item.slug === category);

  const filteredProducts = useMemo(
    () => products.filter((product) => getMenuCategorySlug(product) === category),
    [products, category],
  );

  return (
    <div className="px-5 mt-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-black">
          {categoryInfo
            ? language === "en"
              ? categoryInfo.labelEn
              : categoryInfo.label
            : ""}
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
