import { Link } from "react-router-dom";

import ProductRowCard from "../../ProductCard/ProductRowCard";
import useDragScroll from "./hooks/useDragScroll";

function BrandRow({ brand, items, t }) {
  const { rowRef, dragHandlers } = useDragScroll();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <img
          src={brand.image}
          alt={brand.name}
          className="h-10 object-contain"
        />

        <Link
          to={`/brand/${brand.name}`}
          className="text-green-700 font-bold text-sm"
        >
          {t("home.featured.viewAll")}
        </Link>
      </div>

      <div
        ref={rowRef}
        {...dragHandlers}
        className="
          flex
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-hide
          cursor-grab
          select-none
        "
      >
        {items.map((product) => (
          <div
            key={product.id}
            className="
              flex-none
              w-[calc((100%_-_1.5rem)*0.3334)]
              sm:w-[calc((100%_-_2.25rem)*0.25)]
              lg:w-[calc((100%_-_3rem)*0.2)]
              xl:w-[calc((100%_-_4.5rem)*0.14286)]
            "
          >
            <ProductRowCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandRow;
