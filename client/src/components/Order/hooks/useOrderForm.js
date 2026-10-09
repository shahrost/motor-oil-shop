import { useContext, useState } from "react";
import OrderContext from "../../../context/OrderContext";
import CartContext from "../../../context/CartContext";
import CustomerAuthContext from "../../../context/CustomerAuthContext";
import LanguageContext from "../../../context/LanguageContext";
import buildOrderData from "../helpers/buildOrderData";

const PHONE_LENGTH = 11;

function useOrderForm() {
  const { cart, clearCart, changeAllPaymentType, cartTotal } =
    useContext(CartContext);

  const { addOrder } = useContext(OrderContext);
  const { customer: account } = useContext(CustomerAuthContext);
  const { t } = useContext(LanguageContext);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  }

  // موبایل فقط رقم و حداکثر ۱۱ رقم
  function changePhone(value) {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= PHONE_LENGTH) {
      setCustomer({ ...customer, phone: digits });
    }
  }

  // سبد فقط بعد از ثبت موفق سفارش روی سرور خالی می‌شه
  async function submitOrder(e) {
    e.preventDefault();

    if (submitting) return;

    if (customer.phone.length !== PHONE_LENGTH || !customer.phone.startsWith("09")) {
      alert(t("order.invalidPhone"));
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await addOrder(buildOrderData(cart, customer, cartTotal, account?.id));

      clearCart();
      setSubmitted(true);
    } catch (error) {
      console.log("خطا در ثبت سفارش", error);
      setSubmitError(t("order.submitError"));
    } finally {
      setSubmitting(false);
    }
  }

  return {
    cart,
    cartTotal,
    customer,
    submitted,
    submitting,
    submitError,

    handleChange,
    changePhone,
    submitOrder,
    changeAllPaymentType,
  };
}

export default useOrderForm;
