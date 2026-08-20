import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";

function OrderSuccess() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-white rounded-3xl shadow-md border p-10 text-center">
      <div className="text-6xl">✅</div>

      <h2 className="text-3xl font-extrabold text-green-600 mt-5">
        {t("order.success.title")}
      </h2>

      <p className="mt-4 text-gray-600">{t("order.success.text")}</p>

      <Link
        to="/products"
        className="inline-block mt-6 bg-green-600 text-white px-8 py-3 rounded-xl font-bold"
      >
        {t("common.continueShopping")}
      </Link>
    </div>
  );
}

export default OrderSuccess;
