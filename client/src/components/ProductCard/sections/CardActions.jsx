import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";

function CardActions({ product, handleAddCart }) {
  const { t } = useContext(LanguageContext);

  return (
    <div
      className="
      flex
      justify-center
      gap-2
      mt-4
      "
    >
      <Link
        to={`/product/${product.id}`}
        className="
        bg-black
        text-white
        px-4
        py-2
        rounded-lg
        text-xs
        font-bold
        "
      >
        {t("productCard.view")}
      </Link>

      <button
        onClick={handleAddCart}
        className="
        bg-green-600
        hover:bg-green-700
        text-white
        px-4
        py-2
        rounded-lg
        text-xs
        font-bold
        "
      >
        🛒 {t("common.add")}
      </button>
    </div>
  );
}

export default CardActions;
