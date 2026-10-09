import { useContext } from "react";
import CartContext from "../../../context/CartContext";

function useCartPage() {
  const { cart, clearCart, cartTotal } = useContext(CartContext);

  return {
    cart,
    clearCart,
    cartTotal,
  };
}

export default useCartPage;
