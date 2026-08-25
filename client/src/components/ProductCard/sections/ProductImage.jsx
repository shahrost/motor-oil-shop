import { useState } from "react";
import getImageUrl from "../../../utils/getImageUrl";

function ProductImage({ product }) {
  const [zoomed, setZoomed] = useState(false);
  const src = getImageUrl(product.image?.main);

  return (
    <>
      <img
        src={src}
        alt={product.name}
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
            alt={product.name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
        </div>
      )}
    </>
  );
}

export default ProductImage;
