import { useContext } from "react";
import ProductCard, { ProductCardSkeleton } from "../../ProductCard";
import LanguageContext from "../../../context/LanguageContext";

const GRID = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10";

// loading: تا رسیدن محصولات اسکلت کارت‌ها، نه «پیدا نشد»
function ViscosityProductsList({ products, loading }) {
  const { t } = useContext(LanguageContext);

  if (loading) {
    return <div className={GRID}>{Array.from({ length: 8 }, (_, index) => <ProductCardSkeleton key={index} />)}</div>;
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold">
        {t("viscosityProducts.notFound")}
      </p>
    );
  }

  return (
    <div className={GRID}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ViscosityProductsList;
