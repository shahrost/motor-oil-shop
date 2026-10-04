import { createContext, useState, useEffect } from "react";
import { getCart, saveCart, clearCartStorage } from "../services/cartStorage";
import { getProductPrice } from "../utils/productPrice";

const CartContext = createContext();

// یک محصول با واحد و نوع پرداخت متفاوت، ردیف جداگانه‌ی سبد حساب می‌شه
const isSameLine = (a, b) =>
  a.id === b.id && a.orderType === b.orderType && a.paymentType === b.paymentType;

function itemCount(item) {
  const quantity = Number(item.quantity);

  return item.orderType === "carton" ? quantity * Number(item.cartonCount || 1) : quantity;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getCart);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  function addToCart(product) {
    const exists = cart.some((item) => isSameLine(item, product));

    if (exists) {
      setCart(
        cart.map((item) =>
          isSameLine(item, product)
            ? { ...item, quantity: Number(item.quantity) + Number(product.quantity) }
            : item,
        ),
      );
      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        quantity: Number(product.quantity || 1),
        orderType: product.orderType || "number",
        paymentType: product.paymentType || "cash",
      },
    ]);
  }

  function updateItemAt(index, changes) {
    setCart(cart.map((item, i) => (i === index ? { ...item, ...changes } : item)));
  }

  // پارامتر اول (id) برای سازگاری با فراخوانی‌های فعلی نگه داشته شده؛ ردیف با index مشخص می‌شه
  const removeFromCart = (id, index) => setCart(cart.filter((_, i) => i !== index));
  const updateQuantity = (id, quantity, index) =>
    updateItemAt(index, { quantity: Number(quantity) });
  const changeOrderType = (id, orderType, index) => updateItemAt(index, { orderType });
  const changePaymentType = (id, paymentType, index) => updateItemAt(index, { paymentType });

  function changeAllPaymentType(paymentType) {
    setCart(cart.map((item) => ({ ...item, paymentType })));
  }

  function clearCart() {
    setCart([]);
    clearCartStorage();
  }

  const cartCount = cart.reduce((total, item) => total + Number(item.quantity || 0), 0);

  const cartTotal = cart.reduce(
    (total, item) => total + getProductPrice(item, item.paymentType) * itemCount(item),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        changeOrderType,
        changePaymentType,
        changeAllPaymentType,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
