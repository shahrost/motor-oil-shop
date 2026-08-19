import { useState, useContext } from "react";

import CartContext from "../../../context/CartContext";

function useProductCard(product) {
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("number");
  const [paymentType, setPaymentType] = useState("cash");
  const [added, setAdded] = useState(false);

  function handleAddCart() {
    addToCart({
      ...product,
      quantity: Number(quantity),
      orderType,
      paymentType,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return {
    quantity,
    setQuantity,
    orderType,
    setOrderType,
    paymentType,
    setPaymentType,
    added,
    handleAddCart,
  };
}

export default useProductCard;
