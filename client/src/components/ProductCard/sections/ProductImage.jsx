import { useContext, useState } from "react";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import LanguageContext from "../../../context/LanguageContext";
import {
  getProductImageSrc,
  handleProductImageError,
} from "../../../utils/productImage";
import ImageZoomModal from "./ImageZoomModal";

function ProductImage({ product }) {
  const { language } = useContext(LanguageContext);
  const [zoomed, setZoomed] = useState(false);
  const name = getProductNameLabel(product.name, language);

  const handleImageError = handleProductImageError(product);

  return (
    <>
      <img
        src={getProductImageSrc(product, 480)}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={handleImageError}
        onClick={() => setZoomed(true)}
        className="
        w-full
        h-48
        object-contain
        hover:scale-105
        transition
        duration-500
        cursor-zoom-in
        "
      />

      {zoomed && (
        <ImageZoomModal
          src={getProductImageSrc(product)}
          alt={name}
          onError={handleImageError}
          onClose={() => setZoomed(false)}
        />
      )}
    </>
  );
}

export default ProductImage;
