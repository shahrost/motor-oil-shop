import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import getBrandLabel from "../../utils/brandLabel";
import { getProductNameLabel } from "../../utils/productNameLabel";
import formatPrice from "../../utils/formatPrice";
import getImageUrl from "../../utils/getImageUrl";
import { getBrandLogo } from "../../utils/brandLogo";
import { getProductPrice } from "../../utils/productPrice";
import DiscountBadge from "../common/DiscountBadge";
import useProductCard from "./hooks/useProductCard";

function ProductRowCard({ product }) {
  const { language, t } = useContext(LanguageContext);
  const name = getProductNameLabel(product.name, language);

  const {
    quantity,
    setQuantity,
    orderType,
    setOrderType,
    paymentType,
    setPaymentType,
    added,
    handleAddCart,
  } = useProductCard(product);

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
        alt={name}
        draggable={false}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = getBrandLogo(product.brand);
        }}
        className="w-full h-24 sm:h-32 object-contain"
      />

      <h3 className="hidden sm:block mt-2 text-sm font-bold text-gray-900 line-clamp-2">
        {name}
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
        {formatPrice(getProductPrice(product, paymentType), language)}
      </p>

      <div className="mt-2 space-y-1" onClick={(e) => e.preventDefault()}>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full border rounded-lg p-1 text-xs bg-white text-black"
        >
          <option value="number">{t("common.orderUnit.number")}</option>
          <option value="carton">{t("common.orderUnit.carton")}</option>
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border rounded-lg p-1 text-xs text-black"
        />

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="w-full border rounded-lg p-1 text-xs bg-white text-black"
        >
          <option value="cash">💵 {t("common.paymentType.cash")}</option>
          <option value="check">📝 {t("common.paymentType.check")}</option>
        </select>

        <button
          type="button"
          onClick={handleAddCart}
          className="w-full mt-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-lg text-xs font-bold transition"
        >
          🛒 {t("common.addToCart")}
        </button>

        {added && (
          <p className="text-[11px] text-green-700 font-bold text-center">
            ✅ {t("common.addedToCart")}
          </p>
        )}
      </div>
    </Link>
  );
}

export default ProductRowCard;
