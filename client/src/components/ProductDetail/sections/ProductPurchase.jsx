import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function ProductPurchase({ handleCart, added }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={handleCart}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition"
      >
        🛒 {t("common.addToCart")}
      </button>

      {added && (
        <div className="mt-5 bg-green-600 text-white p-4 rounded-xl text-center font-bold">
          ✅ {t("common.addedToCart")}
        </div>
      )}
    </div>
  );
}

export default ProductPurchase;
