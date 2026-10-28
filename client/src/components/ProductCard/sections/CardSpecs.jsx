import { Link } from "react-router-dom";

import getBrandLabel from "../../../utils/brandLabel";
import { formatVolume } from "../../../utils/formatVolume";
import { getProductTypeSpec } from "../../../utils/productTypeSpec";
import { formatApi, formatViscosity } from "../../../utils/specLabel";
import { untranslatedProps } from "../../../utils/untranslatedText";
import { toPersianDigits } from "../../../utils/digits";

// برند کوچیک ← اسم (دو خط ثابت) ← «گرید · حجم» ← «API · تعداد در کارتن».
// گیربکس اتوماتیک و روغن ترمز به‌جای گرید نوعشون (CVT، DOT4...) رو دارن.
// خط آخر حتی خالی جاش می‌مونه تا مشخصات کارت‌های هم‌ردیف هم‌تراز باشن
function CardSpecs({ product, name, to, state, language, t }) {
  const typeSpec = getProductTypeSpec(product);
  const brandLabel = getBrandLabel(product.brand, language);

  const mainSpecs = [
    typeSpec ? typeSpec.value : formatViscosity(product.viscosity),
    formatVolume(product.volume, language),
  ].filter(Boolean);

  const cartonCount = Number(product.cartonCount) || 0;
  const extraSpecs = [
    !typeSpec && product.api ? `API ${formatApi(product.api)}` : "",
    cartonCount
      ? t("productCard.cartonShort").replace(
          "{count}",
          language === "en" ? cartonCount : toPersianDigits(cartonCount),
        )
      : "",
  ].filter(Boolean);

  return (
    <div className="mt-2">
      <p {...untranslatedProps(brandLabel, language)} className="text-[11px] leading-5 text-gray-500 truncate">
        {brandLabel}
      </p>

      <h3
        {...untranslatedProps(name, language)}
        className="text-sm font-bold leading-6 text-gray-900 line-clamp-2 min-h-12"
      >
        <Link to={to} state={state} draggable={false} className="hover:text-yellow-700">
          {name}
        </Link>
      </h3>

      <p className="mt-1 text-xs font-bold text-gray-700 truncate">
        {mainSpecs.map((spec, index) => (
          <span key={spec}>
            {index > 0 && " · "}
            <bdi>{spec}</bdi>
          </span>
        ))}
      </p>

      <p className="text-[11px] leading-5 text-gray-500 truncate min-h-5">
        {extraSpecs.map((spec, index) => (
          <span key={spec}>
            {index > 0 && " · "}
            <bdi>{spec}</bdi>
          </span>
        ))}
      </p>
    </div>
  );
}

export default CardSpecs;
