import { useContext, useState } from "react";
import CartContext from "../../../context/CartContext";
import { getLastOrder, clearLastOrder } from "../../../services/lastOrderStorage";

function useCartPage() {
  const { cart, clearCart, cartTotal } = useContext(CartContext);

  // آخرین سفارش ثبت‌شده روی این مرورگر؛ مشتری می‌تونه ببندتش
  const [lastOrder, setLastOrder] = useState(getLastOrder);

  // «پاک کردن سبد» دو مرحله‌ایه (لمس اشتباهی روی موبایل کل سبد رو پاک نکنه)
  const [confirmingClear, setConfirmingClear] = useState(false);

  const clearRequest = {
    confirming: confirmingClear,
    ask: () => setConfirmingClear(true),
    cancel: () => setConfirmingClear(false),
    confirm: () => {
      setConfirmingClear(false);
      clearCart();
    },
  };

  function hideLastOrder() {
    clearLastOrder();
    setLastOrder(null);
  }

  return {
    cart,
    clearRequest,
    cartTotal,
    lastOrder,
    hideLastOrder,
  };
}

export default useCartPage;
