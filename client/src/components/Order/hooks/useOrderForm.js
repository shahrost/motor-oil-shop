import { useContext, useState } from "react";
import OrderContext from "../../../context/OrderContext";
import CartContext from "../../../context/CartContext";
import CustomerAuthContext from "../../../context/CustomerAuthContext";
import LanguageContext from "../../../context/LanguageContext";
import buildOrderData from "../helpers/buildOrderData";
import { saveLastOrder } from "../../../services/lastOrderStorage";

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
    location: null,
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

  // موقعیت روی نقشه (اختیاری)؛ از رویدادهای نقشه صدا زده می‌شه، پس state قبلی رو تابعی می‌گیره
  function changeLocation(location) {
    setCustomer((prev) => ({ ...prev, location }));
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
      const orderData = buildOrderData(cart, customer, cartTotal, account?.id);
      const savedOrder = await addOrder(orderData);

      // نسخه‌ی ثبت‌شده برای نمایش در سبد خرید (شماره و وضعیت از پاسخ سرور)
      saveLastOrder({ ...orderData, ...savedOrder });

      clearCart();
      setSubmitted(true);
    } catch (error) {
      console.log("خطا در ثبت سفارش", error);
      // ۴۰۰: سرور دلیل مشخص داده (مثلاً قلمی که قیمت نداره)؛ بقیه‌ی خطاها پیام عمومی
      const reason = error.response?.status === 400 && error.response.data?.message;
      setSubmitError(reason ? `${t("order.submitError")} (${reason})` : t("order.submitError"));
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
    changeLocation,
    submitOrder,
    changeAllPaymentType,
  };
}

export default useOrderForm;
