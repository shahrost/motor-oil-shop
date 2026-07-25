import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "cart",

      JSON.stringify(cart),
    );
  }, [cart]);

  function addToCart(product) {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,

                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,

        {
          ...product,

          quantity: 1,

          orderType: "number",
        },
      ]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }
  function updateQuantity(id, quantity) {
    const newQuantity = Number(quantity);

    if (newQuantity < 1) return;

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,

              quantity: newQuantity,
            }
          : item,
      ),
    );
  }

  function changeOrderType(id, type) {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,

              orderType: type,
            }
          : item,
      ),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,

    0,
  );

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price || 0) * item.quantity,

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
