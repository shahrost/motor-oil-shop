import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import SelectedVehicleContext from "../../context/SelectedVehicleContext";
import usePurchaseOptions from "../../hooks/usePurchaseOptions";
import { getProductNameLabel } from "../../utils/productNameLabel";
import { hasActivePromotion } from "../../utils/promotionCalc";
import CompatibleVehicles from "../common/CompatibleVehicles";
import DiscountBadge from "../common/DiscountBadge";
import FavoriteButton from "../common/FavoriteButton";
import ProductPrice from "../common/ProductPrice";
import PromotionBadge from "../common/PromotionBadge";
import WhatsAppInquiry from "../common/WhatsAppInquiry";
import { CardImage, CardPurchase, CardSpecs, ProductBrandBadge } from "./sections";

// کارت محصول (شبکه‌ها و ردیف‌های افقی، همه یک کارت):
// عکس ← برند ← اسم ← «گرید · حجم» ← API ← قیمت ← کنترل‌ها ← دکمه.
// h-full + flex-col + mt-auto: کارت‌های یک ردیف هم‌قد و قیمت و دکمه‌ها ته کارت هم‌تراز.
// @container: کنترل‌ها و متن دکمه با عرض خود کارت (نه صفحه) جمع‌وجور می‌شن.
// محصول بی‌قیمت: «برای قیمت تماس بگیرید» + «استعلام در واتساپ» به‌جای کنترل‌های خرید
function ProductCard({ product }) {
  const { language, t } = useContext(LanguageContext);
  const vehicle = useContext(SelectedVehicleContext);
  const purchase = usePurchaseOptions(product);

  const name = getProductNameLabel(product.name, language);
  const to = `/product/${product.id}`;
  const state = vehicle ? { vehicle } : undefined;

  return (
    <div
      data-product-id={product.id}
      className="
        @container
        group
        relative
        h-full
        flex
        flex-col
        rounded-xl
        border
        border-gray-200
        bg-white
        p-2
        sm:p-3
        shadow-sm
        hover:shadow-md
        hover:border-yellow-400
        motion-safe:hover:-translate-y-0.5
        motion-safe:active:-translate-y-0.5
        transition
      "
    >
      <div className="relative">
        <CardImage product={product} name={name} to={to} state={state} />

        <ProductBrandBadge product={product} />

        <FavoriteButton productId={product.id} className="absolute top-1.5 right-1.5" />

        {hasActivePromotion(product.promotion) && (
          <PromotionBadge compact className="absolute bottom-1.5 right-1.5" />
        )}

        {product.discountPercent > 0 && (
          <DiscountBadge percent={product.discountPercent} className="absolute bottom-1.5 left-1.5" />
        )}
      </div>

      <CardSpecs product={product} name={name} to={to} state={state} language={language} t={t} />

      <CompatibleVehicles product={product} limit={3} compact className="mt-1" />

      <div className="mt-auto pt-2">
        <ProductPrice
          product={product}
          paymentType={purchase.paymentType}
          orderType={purchase.orderType}
          quantity={purchase.quantity}
          className="text-base sm:text-lg font-extrabold text-gray-950"
          noteClassName="text-[11px]"
        />

        {purchase.priceAvailable ? (
          <CardPurchase product={product} purchase={purchase} t={t} />
        ) : (
          <WhatsAppInquiry product={product} t={t} />
        )}
      </div>
    </div>
  );
}

export default ProductCard;
