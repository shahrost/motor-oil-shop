import { useContext } from "react";
import { CartItems, CartSummary } from "./sections";
import EmptyCart from "../common/EmptyCart";
import useCartPage from "./hooks/useCartPage";
import LanguageContext from "../../context/LanguageContext";

function Cart() {
  const { t } = useContext(LanguageContext);
  const { cart, clearCart, cartTotal } = useCartPage();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="px-5 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8">🛒 {t("nav.cart")}</h1>

        <CartItems cart={cart} />

        <CartSummary cartTotal={cartTotal} clearCart={clearCart} />
      </div>
    </div>
  );
}

export default Cart;
