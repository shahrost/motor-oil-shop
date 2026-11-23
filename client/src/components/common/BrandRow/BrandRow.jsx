import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../context/LanguageContext";

import ProductCard from "../../ProductCard";
import useDragScroll from "./hooks/useDragScroll";
import useRowWindow from "./hooks/useRowWindow";
import ROW_ITEM_WIDTH from "./helpers/rowItemWidth";
import { SwipeHint } from "./sections";
import BrandSaleNotice from "../BrandSaleNotice";

function BrandRow({ brand, items }) {
  const { t } = useContext(LanguageContext);
  const { rowRef, dragHandlers } = useDragScroll();
  const { visibleItems, onScroll } = useRowWindow(items, brand.name);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <img
            src={brand.image}
            alt={brand.name}
            className="h-16 max-w-45 shrink-0 object-contain"
          />

          {brand.name === "بهتام" && (
            <p className="min-w-40 flex-1 text-sm font-bold leading-7 text-amber-800 dark:text-amber-300">
              {t("home.featured.behtamPurchaseNotice")}
            </p>
          )}
        </div>

        <Link
          to={`/brand/${brand.name}`}
          className="shrink-0 text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 font-bold text-sm"
        >
          {t("home.featured.viewAll")}
        </Link>
      </div>

      {items.some((product) => product.salesClosed) && <BrandSaleNotice brand={brand.name} className="mb-4" />}
      <div
        ref={rowRef}
        data-scroll-row={brand.name}
        {...dragHandlers}
        onScroll={onScroll}
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
        {visibleItems.map((product, index) => (
          <div key={product.id} className={`relative flex-none ${ROW_ITEM_WIDTH}`}>
            <ProductCard product={product} />

            {index === 2 && items.length > 3 && <SwipeHint />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandRow;
