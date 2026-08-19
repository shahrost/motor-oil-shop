import { Link } from "react-router-dom";

function CardActions({ product, handleAddCart }) {
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
        مشاهده
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
        🛒 افزودن
      </button>
    </div>
  );
}

export default CardActions;
