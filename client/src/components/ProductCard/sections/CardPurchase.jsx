import { calcPromotionGift } from "../../../utils/promotionCalc";
import GiftBadge from "../../common/GiftBadge";
import QuantityStepper from "../../common/QuantityStepper";
import { OrderUnitSegment, PaymentTypeSegment } from "../../common/OrderOptions";
import AddToCartButton from "./AddToCartButton";

// کنترل‌های خرید کارت: «عدد | کارتن» و «نقدی | چکی» (کارت پهن کنار هم، باریک زیر هم)،
// شمارنده‌ی تعداد، هدیه‌ی طرح فروش و دکمه‌ی افزودن. state همه از usePurchaseOptions
function CardPurchase({ product, purchase, t }) {
  const giftQty = calcPromotionGift(
    product.promotion,
    purchase.orderType,
    purchase.quantity,
    purchase.paymentType,
  );

  return (
    <div className="mt-2 space-y-1.5">
      <div className="grid grid-cols-1 @min-[15rem]:grid-cols-2 gap-1.5">
        <OrderUnitSegment value={purchase.orderType} onChange={purchase.setOrderType} />

        <PaymentTypeSegment
          product={product}
          value={purchase.paymentType}
          onChange={purchase.setPaymentType}
        />
      </div>

      <QuantityStepper
        value={purchase.quantity}
        onChange={purchase.setQuantity}
        label={t("common.quantity")}
        decreaseLabel={t("common.decrease")}
        increaseLabel={t("common.increase")}
      />

      <GiftBadge giftQty={giftQty} className="rounded-lg p-1.5 text-xs" />

      <AddToCartButton added={purchase.added} onClick={purchase.handleAddCart} t={t} />
    </div>
  );
}

export default CardPurchase;
