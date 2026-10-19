import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

const BUTTONS = [
  { value: "cash", icon: "💵", labelKey: "order.buttons.allCash" },
  { value: "check", icon: "📝", labelKey: "order.buttons.allCheck" },
];

const BASE_CLASS =
  "relative flex items-center justify-center gap-2 py-3 rounded-xl font-bold border-2 transition";

const ACTIVE_CLASS = "bg-yellow-400 border-yellow-500 text-gray-950 shadow-md ring-4 ring-yellow-200";

const INACTIVE_CLASS = "bg-white border-gray-300 text-gray-600 hover:border-yellow-400";

// روش پرداخت همه‌ی سفارش؛ دکمه‌ای انتخاب‌شده دیده می‌شه که همه‌ی ردیف‌های سبد همون نوع پرداخت رو دارن
// (اگر ردیف‌ها با هم فرق کنن، هیچ‌کدوم انتخاب‌شده نیست)
function OrderButtons({ cart, changeAllPaymentType }) {
  const { t } = useContext(LanguageContext);

  const isActive = (value) =>
    cart.length > 0 && cart.every((item) => (item.paymentType || "cash") === value);

  return (
    <div className="bg-white rounded-3xl shadow-md border p-5 mb-6">
      <h2 className="text-xl font-bold text-black mb-5">
        💳 {t("order.buttons.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BUTTONS.map((button) => {
          const active = isActive(button.value);

          return (
            <button
              key={button.value}
              type="button"
              onClick={() => changeAllPaymentType(button.value)}
              aria-pressed={active}
              className={`${BASE_CLASS} ${active ? ACTIVE_CLASS : INACTIVE_CLASS}`}
            >
              <span
                aria-hidden="true"
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 text-sm ${
                  active ? "bg-gray-950 border-gray-950 text-yellow-400" : "border-gray-400"
                }`}
              >
                {active ? "✓" : ""}
              </span>
              {button.icon} {t(button.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default OrderButtons;
