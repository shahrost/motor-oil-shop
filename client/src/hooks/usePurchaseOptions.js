import { useState, useContext } from "react";

import CartContext from "../context/CartContext";

// حداقل تعداد سفارش ۱ است؛ فیلد خالی موقع تایپ مجازه ولی موقع افزودن ۱ حساب می‌شه
function sanitizeQuantity(raw) {
  const digits = String(raw).replace(/\D/g, "");

  return digits === "" ? "" : Math.max(1, Number(digits));
}

// انتخاب‌های خرید یک محصول (واحد، تعداد، نوع پرداخت) و افزودن به سبد؛
// کارت‌های محصول و صفحه‌ی محصول همه از همین هوک استفاده می‌کنن
function usePurchaseOptions(product) {
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantityState] = useState(1);
  const [orderType, setOrderType] = useState("number");
  const [paymentType, setPaymentType] = useState("cash");
  const [added, setAdded] = useState(false);

  function setQuantity(raw) {
    setQuantityState(sanitizeQuantity(raw));
  }

  function handleAddCart() {
    if (!product) return;

    addToCart({
      ...product,
      quantity: Number(quantity) || 1,
      orderType,
      paymentType,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return {
    quantity,
    setQuantity,
    orderType,
    setOrderType,
    paymentType,
    setPaymentType,
    added,
    handleAddCart,
  };
}

export default usePurchaseOptions;
