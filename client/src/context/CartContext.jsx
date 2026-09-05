import { createContext, useState, useEffect } from "react";
import { getCart, saveCart, clearCartStorage } from "../services/cartStorage";
import { getProductPrice } from "../utils/productPrice";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const parsedCart = getCart();

    return parsedCart.map((item) => ({
      ...item,

      image:
        typeof item.image === "string"
          ? {
              main: item.image,
              gallery: [],
            }
          : {
              main: item.image?.main || "",
              gallery: item.image?.gallery || [],
            },
    }));
  });

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  function addToCart(product) {
    const exists = cart.find(
      (item) =>
        item.id === product.id &&
        item.orderType === product.orderType &&
        item.paymentType === product.paymentType,
    );

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id &&
          item.orderType === product.orderType &&
          item.paymentType === product.paymentType
            ? {
                ...item,

                quantity: Number(item.quantity) + Number(product.quantity),
              }
            : item,
        ),
      );
    } else {
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
  }

  function removeFromCart(id, index) {
    setCart(cart.filter((_, i) => i !== index));
  }

  function updateQuantity(id, quantity, index) {
    setCart(
      cart.map((item, i) =>
        i === index
          ? {
              ...item,

              quantity: Number(quantity),
            }
          : item,
      ),
    );
  }

  function changeOrderType(id, type, index) {
    setCart(
      cart.map((item, i) =>
        i === index
          ? {
              ...item,

              orderType: type,
            }
          : item,
      ),
    );
  }

  function changePaymentType(id, type, index) {
    setCart(
      cart.map((item, i) =>
        i === index
          ? {
              ...item,

              paymentType: type,
            }
          : item,
      ),
    );
  }

  function changeAllPaymentType(type) {
    setCart(
      cart.map((item) => ({
        ...item,

        paymentType: type,
      })),
    );
  }

  function clearCart() {
    setCart([]);
    clearCartStorage();
  }

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),

    0,
  );

  const cartTotal = cart.reduce(
    (total, item) => {
      const count =
        item.orderType === "carton"
          ? Number(item.quantity) * Number(item.cartonCount || 1)
          : Number(item.quantity);

      return total + getProductPrice(item, item.paymentType) * count;
    },

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
