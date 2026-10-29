import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import getBrandLabel from "../../utils/brandLabel";
import { findBrandLogo } from "../../utils/brandLogo";
import { untranslatedProps } from "../../utils/untranslatedText";

// فیلترهای میهن و لوکومبیل به‌جای گالن، طرح یک فیلتر روغن دارن
const FILTER_SILHOUETTE_BRANDS = ["فیلتر میهن", "فیلتر لوکومبیل"];

function OilSilhouette() {
  return (
    <svg viewBox="0 0 110 130" aria-hidden="true" className="h-[62%] w-auto">
      <path
        fillRule="evenodd"
        className="fill-gray-300 dark:fill-gray-700"
        d="M14 124H96Q102 124 102 118V42Q102 36 97 32L90 26V13H72V26L62 32H46V16Q46 8 38 8H16Q8 8 8 16V118Q8 124 14 124ZM20 16H34Q37 16 37 19V26Q37 29 34 29H20Q17 29 17 26V19Q17 16 20 16Z"
      />
      <rect
        x="69"
        y="8"
        width="24"
        height="7"
        rx="2"
        className="fill-gray-400 dark:fill-gray-600"
      />
      <rect
        x="20"
        y="50"
        width="74"
        height="56"
        rx="6"
        className="fill-gray-100 dark:fill-gray-800"
      />
      <rect
        x="32"
        y="66"
        width="50"
        height="7"
        rx="3.5"
        className="fill-gray-300 dark:fill-gray-600"
      />
      <rect
        x="40"
        y="80"
        width="34"
        height="5"
        rx="2.5"
        className="fill-gray-200 dark:fill-gray-700"
      />
    </svg>
  );
}

// فیلتر روغن پیچی: صفحه‌ی بالایی، بدنه با شیارهای آچارخور و جای برچسب
function FilterSilhouette() {
  return (
    <svg viewBox="0 0 110 130" aria-hidden="true" className="h-[62%] w-auto">
      <rect
        x="12"
        y="8"
        width="86"
        height="14"
        rx="4"
        className="fill-gray-400 dark:fill-gray-600"
      />
      <rect
        x="18"
        y="20"
        width="74"
        height="104"
        rx="9"
        className="fill-gray-300 dark:fill-gray-700"
      />
      {[26, 34, 42, 50, 58, 66, 74, 82].map((x) => (
        <rect
          key={x}
          x={x}
          y="25"
          width="3"
          height="14"
          rx="1.5"
          className="fill-gray-400 dark:fill-gray-600"
        />
      ))}
      <rect
        x="26"
        y="50"
        width="58"
        height="58"
        rx="6"
        className="fill-gray-100 dark:fill-gray-800"
      />
      <rect
        x="35"
        y="68"
        width="40"
        height="7"
        rx="3.5"
        className="fill-gray-300 dark:fill-gray-600"
      />
      <rect
        x="41"
        y="82"
        width="28"
        height="5"
        rx="2.5"
        className="fill-gray-200 dark:fill-gray-700"
      />
    </svg>
  );
}

// تصویر جایگزین محصول بی‌عکس: طرح ساده‌ی یک گالن روغن (همون شکل گالن صفحه‌ی اصلی) به رنگ
// خاکستری روشن، در حالت شب هم‌رنگ تم تیره. لوگوی برند رو نشان گوشه‌ی کارت (ProductBrandBadge)
// نشون می‌ده؛ برند بی‌لوگو اسمش زیر گالن میاد
function ProductPlaceholder({ product }) {
  const { language } = useContext(LanguageContext);
  const hasLogo = Boolean(findBrandLogo(product?.brand));
  const label = getBrandLabel(product?.brand, language);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
      {FILTER_SILHOUETTE_BRANDS.includes(product?.brand) ? (
        <FilterSilhouette />
      ) : (
        <OilSilhouette />
      )}

      {!hasLogo && label && (
        <span
          {...untranslatedProps(label, language)}
          className="max-w-full truncate px-2 text-[11px] font-bold text-gray-500"
        >
          {label}
        </span>
      )}
    </div>
  );
}

export default ProductPlaceholder;
