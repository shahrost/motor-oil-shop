import { useParams } from "react-router-dom";
import { useContext } from "react";

import { ProductContext } from "../../context";
import ProductCard from "../ProductCard";

function BrandProducts() {
  const { brand } = useParams();

  const { products } = useContext(ProductContext);

  const filteredProducts = products.filter(
    (product) => product.brand === brand,
  );

  return (
    <div>
      <section>
        <h1 className="text-3xl font-extrabold text-center">
          محصولات برند {brand}
        </h1>

        <p className="text-center mt-3 text-gray-600">
          {filteredProducts.length} محصول موجود است
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-red-500 mt-10 font-bold">
            محصولی از این برند پیدا نشد
          </p>
        )}
      </section>
    </div>
  );
}

export default BrandProducts;
