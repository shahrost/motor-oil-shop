import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../context/LanguageContext";

import ProductRowCard from "../../ProductCard/ProductRowCard";
import useDragScroll from "./hooks/useDragScroll";
import { SwipeHint } from "./sections";

function BrandRow({ brand, items }) {
  const { t } = useContext(LanguageContext);
  const { rowRef, dragHandlers } = useDragScroll();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <img
          src={brand.image}
          alt={brand.name}
          className="h-16 max-w-45 object-contain"
        />

        <Link
          to={`/brand/${brand.name}`}
          className="text-yellow-700 hover:text-yellow-800 font-bold text-sm"
        >
          {t("home.featured.viewAll")}
        </Link>
      </div>

      <div
        ref={rowRef}
        {...dragHandlers}
        className="
          flex
          items-stretch
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-hide
          cursor-grab
          select-none
        "
      >
        {items.map((product, index) => (
          <div
            key={product.id}
            className="
              relative
              flex-none
              w-[calc((100%_-_1.5rem)*0.3334)]
              sm:w-[calc((100%_-_2.25rem)*0.25)]
              lg:w-[calc((100%_-_3rem)*0.2)]
              xl:w-[calc((100%_-_4.5rem)*0.14286)]
            "
          >
            <ProductRowCard product={product} />

            {index === 2 && items.length > 3 && <SwipeHint />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandRow;
