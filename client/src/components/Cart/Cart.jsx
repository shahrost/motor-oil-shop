import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartItems, CartSummary, LastOrder } from "./sections";
import EmptyCart from "../common/EmptyCart";
import useCartPage from "./hooks/useCartPage";
import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";

function Cart() {
  const { t } = useContext(LanguageContext);
  usePageMeta(t("nav.cart"));
  const { cart, clearCart, cartTotal, lastOrder, hideLastOrder } = useCartPage();

  // بعد از ثبت سفارش سبد خالیه؛ آخرین سفارش زیر پیام «سبد خالی» دیده می‌شه
  if (cart.length === 0) {
    return (
      <>
        <EmptyCart />

        {lastOrder && (
          <div className="px-5 pb-8">
            <div className="max-w-7xl mx-auto">
              <LastOrder order={lastOrder} onHide={hideLastOrder} />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="px-5 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3"><ShoppingCart size={28} /> {t("nav.cart")}</h1>

        <CartItems cart={cart} />

        <CartSummary cartTotal={cartTotal} clearCart={clearCart} />

        <LastOrder order={lastOrder} onHide={hideLastOrder} />
      </div>
    </div>
  );
}

export default Cart;
