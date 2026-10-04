import { useContext } from "react";

import { ProductContext } from "../../../context";
import LanguageContext from "../../../context/LanguageContext";
import brandsData from "../../../data/brands";
import BrandRow from "../../common/BrandRow";

const SKELETON_ROWS = 3;
const SKELETON_CARDS = 7;

// تا محصولات از سرور نرسیدن، جای ردیف‌ها نگه داشته می‌شه تا مشتری فکر نکنه سایت خالیه
// و بخش فیلتر پایین صفحه هم بالا نپره.
function BrandRowsSkeleton() {
  return (
    <div className="space-y-10" aria-busy="true">
      {Array.from({ length: SKELETON_ROWS }, (_, row) => (
        <div key={row} className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-16 w-36 rounded-lg bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>

          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: SKELETON_CARDS }, (_, card) => (
              <div
                key={card}
                className="
                  flex-none
                  w-[calc((100%_-_1.5rem)*0.3334)]
                  sm:w-[calc((100%_-_2.25rem)*0.25)]
                  lg:w-[calc((100%_-_3rem)*0.2)]
                  xl:w-[calc((100%_-_4.5rem)*0.14286)]
                  border-2
                  border-gray-100
                  rounded-xl
                  p-3
                  bg-white
                "
              >
                <div className="h-24 sm:h-32 rounded-lg bg-gray-200" />
                <div className="mt-3 h-3 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
                <div className="mt-3 h-24 rounded-lg bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BrandProductRows() {
  const { products, loading } = useContext(ProductContext);
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
        {loading ? (
          <BrandRowsSkeleton />
        ) : (
          rows.map(({ brand, items }) => (
            <BrandRow key={brand.name} brand={brand} items={items} t={t} />
          ))
        )}
      </div>
    </section>
  );
}

export default BrandProductRows;
