import { useContext } from "react";

import { ProductContext } from "../../../context";
import LanguageContext from "../../../context/LanguageContext";
import BrandRow, { BrandRowSkeleton } from "../BrandRow";
import useBrandRows from "./hooks/useBrandRows";

function ProductRows({ products, notFoundKey = "products.notFound" }) {
  const { t } = useContext(LanguageContext);
  const { loading } = useContext(ProductContext);
  const rows = useBrandRows(products);

  // تا اولین پاسخ سرور، به‌جای «محصولی پیدا نشد» دو ردیف اسکلت
  if (loading && products.length === 0) {
    return (
      <div className="space-y-2">
        <BrandRowSkeleton />
        <BrandRowSkeleton />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow">
        <p className="text-xl font-bold text-gray-700">{t(notFoundKey)}</p>
      </div>
    );
  }

  return (
    // pb-2 داخل BrandRow جای سایه‌ی کارت‌هاست؛ با space-y-2 فاصله‌ی کل ردیف‌ها ۱۶px می‌شه
    <div className="space-y-2">
      {rows.map(({ brand, items }) => (
        <BrandRow key={brand.name} brand={brand} items={items} />
      ))}
    </div>
  );
}

export default ProductRows;
