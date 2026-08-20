import { useContext } from "react";
import ProductCard from "../../ProductCard";
import LanguageContext from "../../../context/LanguageContext";

function ViscosityProductsList({ products }) {
  const { t } = useContext(LanguageContext);

  if (products.length === 0) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("viscosityProducts.notFound")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ViscosityProductsList;
