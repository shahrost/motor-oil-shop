import { useState } from "react";
import { useContext } from "react";
import OrderContext from "../../../context/OrderContext";
import CartContext from "../../../context/CartContext";
import buildOrderData from "../helpers/buildOrderData";

function useOrderForm() {
  const {
    cart,
    clearCart,
    changeAllPaymentType,
    changeOrderType,
    changePaymentType,
    updateQuantity,
    cartTotal,
  } = useContext(CartContext);

  const { addOrder } = useContext(OrderContext);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  }

  function submitOrder(e) {
    e.preventDefault();

    if (customer.phone.length !== 11 || !customer.phone.startsWith("09")) {
      alert("لطفاً شماره موبایل معتبر وارد کنید");
      return;
    }

    const order = buildOrderData(cart, customer, cartTotal);

    addOrder(order);

    clearCart();

    setSubmitted(true);
  }

  return {
    cart,
    customer,
    setCustomer,
    submitted,

    handleChange,
    submitOrder,

    updateQuantity,
    changeOrderType,
    changePaymentType,
    changeAllPaymentType,

    cartTotal,
  };
}

export default useOrderForm;
