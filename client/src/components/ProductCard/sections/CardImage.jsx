import { Link } from "react-router-dom";

import {
  getProductImageSrc,
  handleProductImageError,
  hasProductImage,
} from "../../../utils/productImage";

// عکس کارت با نسبت ثابت ۴:۳ و پس‌زمینه‌ی روشن (در حالت شب هم روشن، چون عکس‌ها زمینه‌ی سفید دارن)؛
// لینک به صفحه‌ی محصول
function CardImage({ product, name, to, state }) {
  return (
    <Link
      to={to}
      state={state}
      draggable={false}
      tabIndex={-1}
      aria-hidden="true"
      className={`block aspect-[4/3] rounded-lg overflow-hidden ${
        hasProductImage(product) ? "bg-[#f5f6f8] dark:bg-[#e3e7ee]" : "bg-gray-50"
      }`}
    >
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
    </Link>
  );
}

export default CardImage;
