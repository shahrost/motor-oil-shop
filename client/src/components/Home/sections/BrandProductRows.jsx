import { useContext } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../../../context";
import LanguageContext from "../../../context/LanguageContext";
import brandsData from "../../../data/brands";
import getBrandLabel from "../../../utils/brandLabel";
import ProductRowCard from "../../ProductCard/ProductRowCard";

function BrandProductRows() {
  const { products } = useContext(ProductContext);
  const { language, t } = useContext(LanguageContext);

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
          <div key={brand.name}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-extrabold">
                {getBrandLabel(brand.name, language)}
              </h2>

              <Link
                to={`/brand/${brand.name}`}
                className="text-green-700 font-bold text-sm"
              >
                {t("home.featured.viewAll")}
              </Link>
            </div>

            <div
              className="
                flex
                gap-3
                overflow-x-auto
                snap-x
                snap-mandatory
                pb-2
                scrollbar-hide
              "
            >
              {items.map((product) => (
                <div
                  key={product.id}
                  className="
                    flex-none
                    snap-start
                    w-[calc((100%-1.5rem)/3)]
                    sm:w-[calc((100%-2.25rem)/4)]
                    lg:w-[calc((100%-3rem)/5)]
                    xl:w-[calc((100%-4.5rem)/7)]
                  "
                >
                  <ProductRowCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandProductRows;
