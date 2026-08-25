import { useContext } from "react";
import ProductCard from "../../ProductCard";
import LanguageContext from "../../../context/LanguageContext";

function ProductGrid({ products }) {
  const { t } = useContext(LanguageContext);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow">
        <p className="text-xl font-bold text-gray-700">{t("products.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {products.map((product) => (
        <div key={product.id} className="animate-[fadeIn_0.4s_ease]">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
