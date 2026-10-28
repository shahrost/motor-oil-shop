import { useContext, useState } from "react";
import OrderContext from "../../../context/OrderContext";
import CartContext from "../../../context/CartContext";
import CustomerAuthContext from "../../../context/CustomerAuthContext";
import LanguageContext from "../../../context/LanguageContext";
import buildOrderData from "../helpers/buildOrderData";
import { saveLastOrder } from "../../../services/lastOrderStorage";
import { cleanPhoneInput } from "../../../utils/phoneInput";

const PHONE_LENGTH = 11;

const isValidPhone = (phone) => phone.length === PHONE_LENGTH && phone.startsWith("09");

function useOrderForm() {
  const { cart, clearCart, changeAllPaymentType, cartTotal } =
    useContext(CartContext);

  const { addOrder } = useContext(OrderContext);
  const { customer: account } = useContext(CustomerAuthContext);
  const { t } = useContext(LanguageContext);

  // null یعنی مشتری هنوز دست نزده: نام و موبایل مشتری واردشده (حتی اگه پروفایل دیرتر برسه) پیش‌فرضه
  const [edits, setEdits] = useState({
    name: null,
    phone: null,
    area: "",
    address: "",
    location: null,
  });

  const customer = {
    ...edits,
    name: edits.name ?? account?.name ?? "",
    phone: edits.phone ?? account?.phone ?? "",
  };

  const [savedOrder, setSavedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setEdits((prev) => ({ ...prev, [name]: value }));
  }

  // موبایل: ارقام فارسی/عربی ← انگلیسی، فقط رقم و حداکثر ۱۱ رقم
  function changePhone(value) {
    setEdits((prev) => ({ ...prev, phone: cleanPhoneInput(value) }));
    setPhoneError("");
  }

  // موقعیت روی نقشه (اختیاری)؛ از رویدادهای نقشه صدا زده می‌شه، پس state قبلی رو تابعی می‌گیره
  function changeLocation(location) {
    setEdits((prev) => ({ ...prev, location }));
  }

  // سبد فقط بعد از ثبت موفق سفارش روی سرور خالی می‌شه
  async function submitOrder(e) {
    e.preventDefault();

    if (submitting) return;

    if (!isValidPhone(customer.phone)) {
      setPhoneError(t("order.invalidPhone"));
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const orderData = buildOrderData(cart, customer);
      const saved = await addOrder(orderData);

      // نسخه‌ی ثبت‌شده برای نمایش در سبد خرید (شماره، مبلغ و وضعیت از پاسخ سرور)
      const lastOrder = { ...orderData, ...saved };
      saveLastOrder(lastOrder);

      clearCart();
      setSavedOrder(lastOrder);
    } catch (error) {
      console.error("خطا در ثبت سفارش", error);
      // ۴۰۰/۴۲۹: سرور دلیل مشخص داده (مثلاً قلمی که قیمت نداره)؛ بقیه‌ی خطاها پیام عمومی
      const status = error.response?.status;
      const reason = (status === 400 || status === 429) && error.response.data?.message;
      setSubmitError(reason ? `${t("order.submitError")} (${reason})` : t("order.submitError"));
    } finally {
      setSubmitting(false);
    }
  }

  return {
    cart,
    cartTotal,
    customer,
    savedOrder,
    submitting,
    submitError,
    phoneError,

    handleChange,
    changePhone,
    changeLocation,
    submitOrder,
    changeAllPaymentType,
  };
}

export default useOrderForm;
