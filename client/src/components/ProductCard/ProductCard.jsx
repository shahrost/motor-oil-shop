import { useContext } from "react";
import {
  ProductImage,
  ProductInfo,
  PurchaseBox,
  CardActions,
} from "./sections";

import useProductCard from "./hooks/useProductCard";
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
  } = useProductCard(product);

  return (
    <div className="border-2 border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition">
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
  );
}

export default ProductCard;
