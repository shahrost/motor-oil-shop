import { useContext } from "react";
import CartEmpty from "./sections/CartEmpty";
import CartItems from "./sections/CartItems";
import CartSummary from "./sections/CartSummary";
import useCartPage from "./hooks/useCartPage";
import LanguageContext from "../../context/LanguageContext";

function Cart() {
  const { t } = useContext(LanguageContext);
  const {
    cart,
    removeFromCart,
    updateQuantity,
    changeOrderType,
    changePaymentType,
    clearCart,
    cartTotal,
  } = useCartPage();

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="px-5 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8">🛒 {t("nav.cart")}</h1>

        <CartItems
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          changeOrderType={changeOrderType}
          changePaymentType={changePaymentType}
        />

        <CartSummary cartTotal={cartTotal} clearCart={clearCart} />
      </div>
    </div>
  );
}

export default Cart;
