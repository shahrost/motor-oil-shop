import { useContext } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../../ProductCard";
import { ProductContext } from "../../../context";

function FeaturedProducts() {
  const { products } = useContext(ProductContext);

  return (
    <section className="px-5 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold">محصولات</h2>

          <Link to="/products" className="text-green-700 font-bold">
            مشاهده همه
          </Link>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-6
          "
        >
          {products.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
