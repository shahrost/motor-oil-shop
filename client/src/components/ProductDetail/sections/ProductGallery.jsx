import { useContext, useState } from "react";
import getImageUrl from "../../../utils/getImageUrl";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import FavoriteButton from "../../common/FavoriteButton";
import ImageZoomModal from "../../common/ImageZoomModal";
import LanguageContext from "../../../context/LanguageContext";
import {
  getProductImageSrc,
  handleProductImageError,
} from "../../../utils/productImage";

// عکس اصلی با کلیک بزرگ می‌شه (بزرگ‌نمایی قبلاً روی کارت محصول بود؛ حالا عکس کارت لینک صفحه‌ی محصوله)
function ProductGallery({ product }) {
  const { language } = useContext(LanguageContext);
  const [zoomed, setZoomed] = useState(false);
  const name = getProductNameLabel(product.name, language);

  const handleImageError = handleProductImageError(product);

  return (
    <div>
      <div className="relative bg-gray-50 rounded-3xl p-5 flex items-center justify-center">
        <FavoriteButton productId={product.id} size="lg" className="absolute top-4 right-4" />

        <img
          src={getProductImageSrc(product)}
          alt={name}
          onError={handleImageError}
          onClick={() => setZoomed(true)}
          className="w-full h-80 object-contain hover:scale-105 transition cursor-zoom-in"
        />
      </div>

      {zoomed && (
        <ImageZoomModal
          src={getProductImageSrc(product)}
          alt={name}
          onError={handleImageError}
          onClose={() => setZoomed(false)}
        />
      )}

      {product.image?.gallery?.length > 0 && (
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {product.image.gallery.map((img, index) => (
            <img
              key={index}
              src={getImageUrl(img)}
              alt={`${name}-${index}`}
              onError={handleImageError}
              className="w-24 h-24 object-contain border rounded-xl cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
