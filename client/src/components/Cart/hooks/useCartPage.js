import { useContext } from "react";
import CartContext from "../../../context/CartContext";

function useCartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    changeOrderType,
    changePaymentType,
    clearCart,
    cartTotal,
  } = useContext(CartContext);

  return {
    cart,
    removeFromCart,
    updateQuantity,
    changeOrderType,
    changePaymentType,
    clearCart,
    cartTotal,
  };
}

export default useCartPage;
