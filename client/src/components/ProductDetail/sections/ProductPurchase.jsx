import { CircleCheck, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function ProductPurchase({ onAddCart, added }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={onAddCart}
        className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-950 py-4 rounded-2xl font-bold text-lg transition"
      >
        <ShoppingCart /> {t("common.addToCart")}
      </button>

      {added && (
        <div className="mt-5 bg-green-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2">
          <CircleCheck /> {t("common.addedToCart")}
        </div>
      )}
    </div>
  );
}

export default ProductPurchase;
