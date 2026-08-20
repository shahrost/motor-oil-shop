import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import OrderProductCard from "./OrderProductCard";
import LanguageContext from "../../../context/LanguageContext";

function OrderProducts({
  cart,
  cartTotal,
  updateQuantity,
  changeOrderType,
  changePaymentType,
}) {
  const { language, t } = useContext(LanguageContext);

  return (
    <div className="bg-white rounded-3xl shadow-md border p-5 mb-6">
      <h2 className="text-xl font-bold text-black mb-6">
        🛒 {t("order.products.title")}
      </h2>

      <div className="space-y-5">
        {cart.map((item, index) => (
          <OrderProductCard
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            updateQuantity={updateQuantity}
            changeOrderType={changeOrderType}
            changePaymentType={changePaymentType}
          />
        ))}
      </div>

      <div className="mt-8 bg-green-100 border border-green-300 rounded-2xl p-5">
        <p className="text-xl font-extrabold text-green-700">
          {t("order.products.total")} {formatPrice(cartTotal, language)}
        </p>
      </div>
    </div>
  );
}

export default OrderProducts;
