import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import brandsData from "../../../data/brands";
import BrandRow from "../BrandRow";

function ProductRows({ products, notFoundKey = "products.notFound" }) {
  const { t } = useContext(LanguageContext);

  const rows = brandsData
    .map((brand) => ({
      brand,
      items: products.filter((product) => product.brand === brand.name),
    }))
    .filter((row) => row.items.length > 0);

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow">
        <p className="text-xl font-bold text-gray-700">{t(notFoundKey)}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {rows.map(({ brand, items }) => (
        <BrandRow key={brand.name} brand={brand} items={items} t={t} />
      ))}
    </div>
  );
}

export default ProductRows;
