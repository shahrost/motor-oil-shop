import { useContext } from "react";
import getImageUrl from "../../../utils/getImageUrl";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { getBrandLogo } from "../../../utils/brandLogo";
import LanguageContext from "../../../context/LanguageContext";

function ProductGallery({ product }) {
  const { language } = useContext(LanguageContext);
  const name = getProductNameLabel(product.name, language);

  function handleImageError(e) {
    e.target.onerror = null;
    e.target.src = getBrandLogo(product.brand);
  }

  return (
    <div>
      <div className="bg-gray-50 rounded-3xl p-5 flex items-center justify-center">
        <img
          src={getImageUrl(product.image?.main)}
          alt={name}
          onError={handleImageError}
          className="w-full h-80 object-contain hover:scale-105 transition"
        />
      </div>

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
