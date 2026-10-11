import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import useBrandBadge from "./hooks/useBrandBadge";

// اندازه و ظاهر هر نوع نشان. ارتفاع لوگو ثابته و عرضش با نسبت خود لوگو (تا سقف
// max-w قاب؛ قانون سراسری img { max-width: 100% } در index.css سقف خود عکس رو
// خنثی می‌کنه، پس سقف روی قاب است)، تا لوگوهای پهن (مثل BAIC، Exeed) ریز نشن و کارت رو هم
// نپوشونن. ارتفاع کل نشان با padding: خودرو ۲۸px موبایل / ۴۰px دسکتاپ، محصول ۲۰px / ۲۴px
const VARIANTS = {
  vehicle: {
    frame: "p-1 max-w-18 sm:max-w-26 rounded-lg bg-white/85 shadow-sm",
    logo: "h-5 sm:h-8",
    letter: "h-5 w-5 sm:h-8 sm:w-8 text-xs sm:text-base",
    px: 32,
  },
  // مینیمال: پس‌زمینه‌ی روشن فقط برای خوانایی لوگو روی کارت تیره‌ی حالت شب
  product: {
    frame: "p-0.5 max-w-12 sm:max-w-15 rounded bg-white/90",
    logo: "h-4 sm:h-5",
    letter: "h-4 w-4 sm:h-5 sm:w-5 text-[10px] sm:text-xs",
    px: 20,
  },
};

// نشان کوچک لوگوی برند گوشه‌ی بالا-چپ کارت (والد باید relative باشه).
// left فیزیکی است (نه inset-inline-start) تا در FA و EN همیشه سمت چپ بمونه.
// z-1: فقط بالای عکس کارت (حتی موقع بزرگ‌نمایی hover)، زیر هدر/منو/مودال‌ها.
// pointer-events-none: کلیک از نشان رد می‌شه و رفتار کارت/عکس زیرش عوض نمی‌شه.
function BrandBadge({ src, name, variant = "vehicle" }) {
  const { t } = useContext(LanguageContext);
  const { showLogo, onError } = useBrandBadge(src);

  if (!name && !showLogo) return null;

  const style = VARIANTS[variant] || VARIANTS.vehicle;
  const alt = t("common.brandLogo").replace("{brand}", name || "");

  return (
    <span
      className={`pointer-events-none absolute top-2 left-2 z-1 ${style.frame}`}
    >
      {showLogo ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={style.px}
          height={style.px}
          draggable={false}
          onError={onError}
          className={`block w-auto object-contain ${style.logo}`}
        />
      ) : (
        <span
          role="img"
          aria-label={alt}
          className={`flex items-center justify-center font-extrabold leading-none text-gray-500 ${style.letter}`}
        >
          {name.slice(0, 1)}
        </span>
      )}
    </span>
  );
}

export default BrandBadge;
