import { CircleCheck } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";

function OrderSuccess() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-white rounded-3xl shadow-md border p-10 text-center">
      <CircleCheck size={64} className="mx-auto text-green-600" />

      <h2 className="text-3xl font-extrabold text-green-600 mt-5">
        {t("order.success.title")}
      </h2>

      <p className="mt-4 text-gray-600">{t("order.success.text")}</p>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Link
          to="/cart"
          className="inline-block bg-gray-800 text-white px-8 py-3 rounded-xl font-bold"
        >
          {t("order.success.viewInCart")}
        </Link>

        <Link
          to="/products"
          className="inline-block bg-yellow-400 text-gray-950 px-8 py-3 rounded-xl font-bold"
        >
          {t("common.continueShopping")}
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
