import { useParams } from "react-router-dom";
import { useContext } from "react";

import { ProductContext } from "../../context";
import ProductCard from "../ProductCard";
import LanguageContext from "../../context/LanguageContext";
import getBrandLabel from "../../utils/brandLabel";

function BrandProducts() {
  const { brand } = useParams();

  const { products } = useContext(ProductContext);
  const { language, t } = useContext(LanguageContext);

  const filteredProducts = products.filter(
    (product) => product.brand === brand,
  );

  return (
    <div>
      <section>
        <h1 className="text-3xl font-extrabold text-center">
          {t("brandProducts.title")} {getBrandLabel(brand, language)}
        </h1>

        <p className="text-center mt-3 text-gray-600">
          {filteredProducts.length} {t("common.productsAvailable")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-red-500 mt-10 font-bold">
            {t("brandProducts.notFound")}
          </p>
        )}
      </section>
    </div>
  );
}

export default BrandProducts;
