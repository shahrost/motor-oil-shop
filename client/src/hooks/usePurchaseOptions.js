import { useState, useContext } from "react";

import CartContext from "../context/CartContext";
import SelectedVehicleContext from "../context/SelectedVehicleContext";
import { hasProductPrice, resolvePaymentType } from "../utils/productPrice";
import { toLatinDigits } from "../utils/digits";

// حداقل تعداد سفارش ۱ و فقط عدد صحیح: صفر و منفی ← ۱، اعشاری ← قسمت صحیحش (حداقل ۱)؛
// فیلد خالی موقع تایپ مجازه ولی موقع افزودن ۱ حساب می‌شه
function sanitizeQuantity(raw) {
  const text = toLatinDigits(raw).trim();
  if (text === "") return "";

  const number = Math.floor(Number(text));

  return Number.isFinite(number) ? Math.max(1, number) : 1;
}

// انتخاب‌های خرید یک محصول (واحد، تعداد، نوع پرداخت) و افزودن به سبد؛
// کارت‌های محصول و صفحه‌ی محصول همه از همین هوک استفاده می‌کنن.
// vehicle: خودروی انتخاب‌شده (پیش‌فرض از SelectedVehicleContext)
function usePurchaseOptions(product, { vehicle } = {}) {
  const { addToCart } = useContext(CartContext);
  const contextVehicle = useContext(SelectedVehicleContext);
  const selectedVehicle = vehicle || contextVehicle;

  const [quantity, setQuantityState] = useState(1);
  const [orderType, setOrderType] = useState("number");
  const [selectedPaymentType, setPaymentType] = useState("cash");
  const [added, setAdded] = useState(false);

  // روش پرداخت بی‌قیمت (مثلاً نقدی خالی ولی چکی دارد) خودکار روی روش دارای قیمت می‌مونه
  const paymentType = resolvePaymentType(product, selectedPaymentType);
  const priceAvailable = hasProductPrice(product, paymentType);

  function setQuantity(raw) {
    setQuantityState(sanitizeQuantity(raw));
  }

  function handleAddCart() {
    if (!product || !priceAvailable) return;

    addToCart({
      ...product,
      quantity: Number(quantity) || 1,
      orderType,
      paymentType,
      ...(selectedVehicle && { vehicle: selectedVehicle }),
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
    priceAvailable,
    added,
    handleAddCart,
  };
}

export default usePurchaseOptions;
