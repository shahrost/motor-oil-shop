import { useContext } from "react";

import { ProductContext } from "../../../context";
import LanguageContext from "../../../context/LanguageContext";
import brandsData from "../../../data/brands";
import BrandRow from "./BrandRow";

function BrandProductRows() {
  const { products } = useContext(ProductContext);
  const { t } = useContext(LanguageContext);

  const rows = brandsData
    .map((brand) => ({
      brand,
      items: products.filter((product) => product.brand === brand.name),
    }))
    .filter((row) => row.items.length > 0);

  return (
    <section className="px-5 mt-14">
      <div className="max-w-7xl mx-auto space-y-10">
        {rows.map(({ brand, items }) => (
          <BrandRow key={brand.name} brand={brand} items={items} t={t} />
        ))}
      </div>
    </section>
  );
}

export default BrandProductRows;
