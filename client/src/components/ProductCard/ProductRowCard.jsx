import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import { getProductNameLabel } from "../../utils/productNameLabel";
import formatPrice from "../../utils/formatPrice";
import {
  getProductImageSrc,
  handleProductImageError,
} from "../../utils/productImage";
import { getProductPrice } from "../../utils/productPrice";
import DiscountBadge from "../common/DiscountBadge";
import CompatibleVehicles from "../common/CompatibleVehicles";
import { RowCardSpecs, RowCardPurchase } from "./sections";
import usePurchaseOptions from "../../hooks/usePurchaseOptions";

// کارت فشرده‌ی محصول برای ردیف‌های افقی (صفحه‌ی اصلی)
function ProductRowCard({ product }) {
  const { language, t } = useContext(LanguageContext);
  const name = getProductNameLabel(product.name, language);
  const card = usePurchaseOptions(product);

  return (
    <Link
      to={`/product/${product.id}`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="h-full block border-2 border-gray-200 rounded-xl p-3 bg-white shadow-sm hover:shadow-md hover:border-yellow-400 transition"
    >
      <img
        src={getProductImageSrc(product, 320)}
        alt={name}
        loading="lazy"
        decoding="async"
        width="320"
        height="128"
        draggable={false}
        onError={handleProductImageError(product)}
        className="w-full h-24 sm:h-32 object-contain"
      />

      <RowCardSpecs product={product} name={name} language={language} t={t} />

      <CompatibleVehicles
        product={product}
        limit={3}
        compact
        className="mt-2"
      />

      <div className="mt-2 text-right">
        <DiscountBadge percent={product.discountPercent || 0} />
      </div>

      <p className="mt-1 text-sm sm:text-lg font-extrabold text-gray-950">
        {formatPrice(getProductPrice(product, card.paymentType), language)}
      </p>

      <RowCardPurchase
        t={t}
        orderType={card.orderType}
        setOrderType={card.setOrderType}
        quantity={card.quantity}
        setQuantity={card.setQuantity}
        paymentType={card.paymentType}
        setPaymentType={card.setPaymentType}
        added={card.added}
        onAddCart={card.handleAddCart}
      />
    </Link>
  );
}

export default ProductRowCard;
