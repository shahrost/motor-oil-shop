import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { getCart, saveCart, clearCartStorage } from "../services/cartStorage";
import { getItemTotal } from "../utils/cartItemCalc";
import { isPaymentTypeDisabled } from "../utils/productPrice";
import liveCartItems from "../utils/liveCartItems";
import ProductContext from "./ProductContext/ProductContext";

const CartContext = createContext();

// یک محصول با واحد و نوع پرداخت متفاوت، ردیف جداگانه‌ی سبد حساب می‌شه
const isSameLine = (a, b) =>
  a.id === b.id && a.orderType === b.orderType && a.paymentType === b.paymentType;

export function CartProvider({ children }) {
  const { products } = useContext(ProductContext);
  const [storedCart, setCart] = useState(getCart);
  // شمارنده‌ی «افزودن به سبد» برای انیمیشن کوچیک دکمه‌ی سبد هدر (با هر افزودن یکی زیاد می‌شه)
  const [addedCount, setAddedCount] = useState(0);

  // قیمت و طرح فروش هر ردیف همیشه از لیست فعلی محصولات (نه نسخه‌ی قدیمی localStorage)
  const cart = useMemo(() => liveCartItems(storedCart, products), [storedCart, products]);

  useEffect(() => {
    saveCart(storedCart);
  }, [storedCart]);

  const value = useMemo(() => {
    function addToCart(product) {
      setAddedCount((count) => count + 1);

      setCart((prev) => {
        if (prev.some((item) => isSameLine(item, product))) {
          return prev.map((item) =>
            isSameLine(item, product)
              ? { ...item, quantity: Number(item.quantity) + Number(product.quantity) }
              : item,
          );
        }

        return [
          ...prev,
          {
            ...product,
            quantity: Number(product.quantity || 1),
            orderType: product.orderType || "number",
            paymentType: product.paymentType || "cash",
          },
        ];
      });
    }

    function updateItemAt(index, changes) {
      setCart((prev) => prev.map((item, i) => (i === index ? { ...item, ...changes } : item)));
    }

    // ردیفی که روش انتخاب‌شده براش قیمت نداره (ولی روش فعلیش داره) دست نمی‌خوره
    function changeAllPaymentType(paymentType) {
      setCart((prev) =>
        prev.map((item, i) =>
          isPaymentTypeDisabled(cart[i] || item, paymentType) ? item : { ...item, paymentType },
        ),
      );
    }

    function clearCart() {
      setCart([]);
      clearCartStorage();
    }

    return {
      cart,
      addToCart,
      // پارامتر اول (id) برای سازگاری با فراخوانی‌های فعلی نگه داشته شده؛ ردیف با index مشخص می‌شه
      removeFromCart: (id, index) => setCart((prev) => prev.filter((_, i) => i !== index)),
      updateQuantity: (id, quantity, index) => updateItemAt(index, { quantity: Number(quantity) }),
      changeOrderType: (id, orderType, index) => updateItemAt(index, { orderType }),
      changePaymentType: (id, paymentType, index) => updateItemAt(index, { paymentType }),
      changeAllPaymentType,
      clearCart,
      cartCount: cart.reduce((total, item) => total + Number(item.quantity || 0), 0),
      cartTotal: cart.reduce((total, item) => total + getItemTotal(item), 0),
      addedCount,
    };
  }, [cart, addedCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
