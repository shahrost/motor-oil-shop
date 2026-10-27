import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Gift } from "lucide-react";

import LanguageContext from "../../../context/LanguageContext";
import getBrandLabel from "../../../utils/brandLabel";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { getProductImageSrc, handleProductImageError } from "../../../utils/productImage";
import { untranslatedProps } from "../../../utils/untranslatedText";
import { toPersianDigits } from "../../../utils/digits";

// یک کارت بنر طرح فروش (کادر کهربایی مثل «طرح فروش ویژه» صفحه‌ی محصول).
// گروه تک‌محصولی ← صفحه‌ی همون محصول؛ گروه چندمحصولی (مثل جشنواره) ← صفحه‌ی /promotions
function PromotionSlide({ group, className = "" }) {
  const { language, t } = useContext(LanguageContext);
  const [first] = group.products;
  const isGroup = group.products.length > 1;
  const firstName = getProductNameLabel(first.name, language);
  const sameName = group.products.every((product) => product.name === first.name);

  const title = group.note || firstName;
  const brandLabel = getBrandLabel(group.brand, language);
  const count = t("home.promotions.productCount").replace(
    "{count}",
    language === "en" ? group.products.length : toPersianDigits(group.products.length),
  );
  const subtitle = isGroup
    ? `${sameName && group.note ? `${firstName} · ` : ""}${brandLabel} · ${count}`
    : brandLabel;

  return (
    <Link
      to={isGroup ? "/promotions" : `/product/${first.id}`}
      className={`snap-start flex gap-3 border-2 border-amber-300 bg-amber-50 rounded-2xl p-4 hover:shadow-md transition ${className}`}
    >
      <div className="relative shrink-0 w-20 h-20">
        {group.products.slice(0, 3).map((product, index) => (
          <img
            key={product.id}
            src={getProductImageSrc(product, 160)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onError={handleProductImageError(product)}
            style={{ insetInlineStart: `${index * 10}px`, top: `${index * 6}px`, zIndex: 3 - index }}
            className={`absolute object-contain bg-[#fdfdfe] rounded-xl p-1.5 shadow-sm ${
              isGroup ? "w-16 h-16" : "w-20 h-20"
            }`}
          />
        ))}
      </div>

      <div className="min-w-0 flex-1 flex flex-col">
        <h3 {...untranslatedProps(title, language)} className="font-extrabold text-gray-900 line-clamp-2">
          {title}
        </h3>

        <p {...untranslatedProps(subtitle, language)} className="text-xs text-gray-600 mt-0.5">
          {subtitle}
        </p>

        <div className="mt-2 space-y-0.5">
          {group.lines.map((line) => (
            <p key={line} className="text-amber-800 font-bold text-sm flex items-center gap-1.5">
              <Gift size={16} /> {line}
            </p>
          ))}
        </div>

        <span className="mt-auto pt-2 self-end inline-flex items-center gap-0.5 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {t("home.promotions.view")}
          <ChevronLeft size={14} className="ltr:rotate-180" />
        </span>
      </div>
    </Link>
  );
}

export default PromotionSlide;
