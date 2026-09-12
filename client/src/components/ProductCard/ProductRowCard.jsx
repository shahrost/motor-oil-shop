import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import getBrandLabel from "../../utils/brandLabel";
import formatPrice from "../../utils/formatPrice";
import getImageUrl from "../../utils/getImageUrl";
import { getProductPrice } from "../../utils/productPrice";
import DiscountBadge from "../common/DiscountBadge";

function ProductRowCard({ product }) {
  const { language, t } = useContext(LanguageContext);

  return (
    <Link
      to={`/product/${product.id}`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="
        h-full
        block
        border-2
        border-gray-200
        rounded-xl
        p-3
        bg-white
        shadow-sm
        hover:shadow-md
        hover:border-green-300
        transition
      "
    >
      <img
        src={getImageUrl(product.image?.main)}
        alt={product.name}
        draggable={false}
        className="w-full h-24 sm:h-32 object-contain"
      />

      <h3 className="hidden sm:block mt-2 text-sm font-bold text-gray-900 line-clamp-2">
        {product.name}
      </h3>

      <div className="mt-2 text-xs sm:text-sm font-bold text-gray-700 space-y-1">
        <p className="line-clamp-1">
          <span className="text-green-700">{t("common.brand")}</span>{" "}
          {getBrandLabel(product.brand, language)}
        </p>

        <p className="hidden sm:block line-clamp-1">
          <span className="text-green-700">{t("common.viscosity")}</span>{" "}
          {product.viscosity}
        </p>

        <p className="line-clamp-1">
          <span className="text-green-700">{t("common.volume")}</span>{" "}
          {product.volume}
        </p>
      </div>

      <div className="mt-2 text-right">
        <DiscountBadge percent={product.discountPercent || 0} />
      </div>

      <p className="mt-1 text-sm sm:text-lg font-extrabold text-green-700">
        {formatPrice(getProductPrice(product), language)}
      </p>
    </Link>
  );
}

export default ProductRowCard;
