import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import getBrandLabel from "../../utils/brandLabel";
import { getProductNameLabel } from "../../utils/productNameLabel";
import { formatVolume } from "../../utils/formatVolume";
import formatPrice from "../../utils/formatPrice";
import getProductImageSrc from "../../utils/productImage";
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
        hover:border-yellow-400
        transition
      "
    >
      <img
        src={getProductImageSrc(product, 320)}
        alt={name}
        loading="lazy"
        decoding="async"
        width="320"
        height="128"
        draggable={false}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = getBrandLogo(product.brand);
        }}
        className="w-full h-24 sm:h-32 object-contain"
      />

      <h3 className="hidden sm:line-clamp-2 mt-2 text-sm font-bold text-gray-900">
        {name}
      </h3>

      <div className="mt-2 text-xs sm:text-sm font-bold text-gray-700 space-y-1">
        <p className="line-clamp-1">
          <span className="text-gray-500">{t("common.brand")}</span>{" "}
          {getBrandLabel(product.brand, language)}
        </p>

        {/* بدون گرید (فیلتر، ضدیخ، گریس و ...) خط نامرئی می‌مونه تا کارت‌ها هم‌تراز باشن */}
        <p
          className={`hidden sm:line-clamp-1 ${product.viscosity ? "" : "invisible"}`}
          aria-hidden={product.viscosity ? undefined : true}
        >
          <span className="text-gray-500">{t("common.viscosity")}</span>{" "}
          {product.viscosity}
        </p>

        <p
          className={`hidden sm:line-clamp-1 ${product.api ? "" : "invisible"}`}
          aria-hidden={product.api ? undefined : true}
        >
          <span className="text-gray-500"><bdi>API</bdi>:</span> <bdi>{product.api}</bdi>
        </p>

        <p className="line-clamp-1">
          <span className="text-gray-500">{t("common.volume")}</span>{" "}
          {formatVolume(product.volume, language)}
        </p>
      </div>

      <div className="mt-2 text-right">
        <DiscountBadge percent={product.discountPercent || 0} />
      </div>

      <p className="mt-1 text-sm sm:text-lg font-extrabold text-gray-950">
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
          className="w-full mt-1 bg-yellow-400 hover:bg-yellow-500 text-gray-950 py-1.5 rounded-lg text-xs font-bold transition"
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
