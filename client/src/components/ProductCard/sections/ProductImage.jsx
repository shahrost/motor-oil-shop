import getImageUrl from "../../../utils/getImageUrl";

function ProductImage({ product }) {
  return (
    <img
      src={getImageUrl(product.image?.main)}
      alt={product.name}
      className="
      w-full
      h-52
      object-contain
      hover:scale-105
      transition
      duration-500
      "
    />
  );
}

export default ProductImage;
