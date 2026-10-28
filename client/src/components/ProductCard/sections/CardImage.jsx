import { Link } from "react-router-dom";

import ProductPlaceholder from "../../common/ProductPlaceholder";
import {
  getProductImageSrc,
  handleProductImageError,
  hasProductImage,
} from "../../../utils/productImage";

// عکس کارت با نسبت ثابت ۴:۳ و پس‌زمینه‌ی روشن (در حالت شب هم روشن، چون عکس‌ها زمینه‌ی سفید دارن)؛
// لینک به صفحه‌ی محصول. محصول بی‌عکس: تصویر جایگزین گالن (نه لوگوی بزرگ برند)
function CardImage({ product, name, to, state }) {
  const hasImage = hasProductImage(product);

  return (
    <Link
      to={to}
      state={state}
      draggable={false}
      tabIndex={-1}
      aria-hidden="true"
      className={`block aspect-[4/3] rounded-lg overflow-hidden ${
        hasImage ? "bg-[#f5f6f8] dark:bg-[#e3e7ee]" : "bg-gray-50"
      }`}
    >
      {hasImage ? (
        <img
          src={getProductImageSrc(product, 320)}
          alt={name}
          loading="lazy"
          decoding="async"
          width="320"
          height="240"
          draggable={false}
          onError={handleProductImageError(product)}
          className="w-full h-full object-contain p-1.5 transition-transform duration-300 motion-safe:group-hover:scale-105"
        />
      ) : (
        <ProductPlaceholder product={product} />
      )}
    </Link>
  );
}

export default CardImage;
