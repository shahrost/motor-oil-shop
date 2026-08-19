import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../../context";
import CartContext from "../../../context/CartContext";

function useProductDetail() {
  const { id } = useParams();

  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("number");
  const [paymentType, setPaymentType] = useState("cash");
  const [added, setAdded] = useState(false);

  function finalCount() {
    if (orderType === "carton") {
      return Number(quantity) * Number(product?.cartonCount || 1);
    }

    return Number(quantity);
  }

  function handleCart() {
    if (!product) return;

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
    product,
    quantity,
    setQuantity,
    orderType,
    setOrderType,
    paymentType,
    setPaymentType,
    finalCount,
    handleCart,
    added,
  };
}

export default useProductDetail;
