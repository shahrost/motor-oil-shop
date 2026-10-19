import { useContext, useState } from "react";
import CartContext from "../../../context/CartContext";
import { getLastOrder, clearLastOrder } from "../../../services/lastOrderStorage";

function useCartPage() {
  const { cart, clearCart, cartTotal } = useContext(CartContext);

  // آخرین سفارش ثبت‌شده روی این مرورگر؛ مشتری می‌تونه ببندتش
  const [lastOrder, setLastOrder] = useState(getLastOrder);

  function hideLastOrder() {
    clearLastOrder();
    setLastOrder(null);
  }

  return {
    cart,
    clearCart,
    cartTotal,
    lastOrder,
    hideLastOrder,
  };
}

export default useCartPage;
