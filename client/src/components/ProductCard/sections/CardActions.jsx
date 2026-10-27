import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";

// canAdd: محصول بی‌قیمت («برای قیمت تماس بگیرید») به سبد اضافه نمی‌شه
function CardActions({ product, handleAddCart, canAdd = true }) {
  const { t } = useContext(LanguageContext);

  return (
    <div
      className="
      flex
      gap-2
      mt-3
      "
    >
      <Link
        to={`/product/${product.id}`}
        className="
        flex-1
        text-center
        bg-black
        hover:bg-gray-800
        text-white
        px-3
        py-2
        rounded-lg
        text-sm
        font-bold
        transition
        "
      >
        {t("productCard.view")}
      </Link>

      <button
        onClick={handleAddCart}
        disabled={!canAdd}
        className="
        flex-1
        bg-yellow-400
        hover:bg-yellow-500
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-yellow-400
        text-gray-950
        px-3
        py-2
        rounded-lg
        text-sm
        font-bold
        transition
        "
      >
        <ShoppingCart size={16} /> {t("common.addToCart")}
      </button>
    </div>
  );
}

export default CardActions;
