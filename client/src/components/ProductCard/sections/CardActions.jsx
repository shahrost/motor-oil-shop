import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";

function CardActions({ product, handleAddCart }) {
  const { t } = useContext(LanguageContext);

  return (
    <div
      className="
      flex
      gap-2
      mt-4
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
        py-2.5
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
        className="
        flex-1
        bg-green-600
        hover:bg-green-700
        text-white
        px-3
        py-2.5
        rounded-lg
        text-sm
        font-bold
        transition
        "
      >
        🛒 {t("common.addToCart")}
      </button>
    </div>
  );
}

export default CardActions;
