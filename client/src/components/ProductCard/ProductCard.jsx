import { useContext } from "react";
import {
  ProductImage,
  ProductInfo,
  PurchaseBox,
  CardActions,
} from "./sections";

import usePurchaseOptions from "../../hooks/usePurchaseOptions";
import LanguageContext from "../../context/LanguageContext";

function ProductCard({ product }) {
  const { t } = useContext(LanguageContext);
  const {
    quantity,
    setQuantity,
    orderType,
    setOrderType,
    paymentType,
    setPaymentType,
    added,
    handleAddCart,
  } = usePurchaseOptions(product);

  return (
    // flex-col: lets the actions block be pushed to the bottom (grid stretch already equalizes card height)
    <div className="flex flex-col border-2 border-gray-200 rounded-xl p-3 bg-white shadow-sm hover:shadow-md hover:border-yellow-400 transition">
      <ProductImage product={product} />

      <ProductInfo product={product} paymentType={paymentType} />

      <PurchaseBox
        product={product}
        orderType={orderType}
        setOrderType={setOrderType}
        quantity={quantity}
        setQuantity={setQuantity}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
      />

      {/* mt-auto: actions always sit at the card bottom, aligned across the row */}
      <div className="mt-auto">
        <CardActions product={product} handleAddCart={handleAddCart} />

        {added && (
          <div
            className="
            mt-4
            bg-green-600
            text-white
            rounded-lg
            p-2
            text-center
            text-sm
            font-bold
            "
          >
            ✅ {t("common.addedToCart")}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
