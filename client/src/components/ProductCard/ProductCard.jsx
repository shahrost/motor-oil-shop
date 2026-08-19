import {
  ProductImage,
  ProductInfo,
  PurchaseBox,
  CardActions,
} from "./sections";

import useProductCard from "./hooks/useProductCard";

function ProductCard({ product }) {
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
    <div className="border rounded-2xl p-4 bg-white shadow-sm">
      <ProductImage product={product} />

      <ProductInfo product={product} />

      <PurchaseBox
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
          ✅ به سبد خرید اضافه شد
        </div>
      )}
    </div>
  );
}

export default ProductCard;
