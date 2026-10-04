import { useContext, useState } from "react";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import LanguageContext from "../../../context/LanguageContext";
import {
  getProductImageSrc,
  handleProductImageError,
} from "../../../utils/productImage";

function ProductImage({ product }) {
  const { language } = useContext(LanguageContext);
  const [zoomed, setZoomed] = useState(false);
  const src = getProductImageSrc(product);
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
        h-56
        object-contain
        hover:scale-105
        transition
        duration-500
        cursor-zoom-in
        "
      />

      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/80
          p-4
          "
        >
          <button
            onClick={() => setZoomed(false)}
            aria-label="close"
            className="
            absolute
            top-4
            end-4
            text-white
            text-4xl
            leading-none
            "
          >
            ×
          </button>

          <img
            src={src}
            alt={name}
            onError={handleImageError}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
        </div>
      )}
    </>
  );
}

export default ProductImage;
