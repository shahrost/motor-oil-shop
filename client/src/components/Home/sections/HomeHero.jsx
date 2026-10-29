import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift } from "lucide-react";

import LanguageContext from "../../../context/LanguageContext";
import brand from "../../../data/brand";
import OilDropArt from "./OilDropArt";

// بخش معرفی بالای صفحه‌ی اصلی: هم‌رنگ هدر (سرمه‌ای)، تیتر و زیرتیتر از data/brand.js
// و فقط یک دکمه‌ی کوچیک «طرح‌های فروش» (زرد با نقطه‌ی چشمک‌زن تا توی چشم باشه).
// قطره‌ی کم‌رنگ گوشه فقط تزئینیه
function HomeHero() {
  const { language, t } = useContext(LanguageContext);
  const isEn = language === "en";

  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
      <OilDropArt className="pointer-events-none absolute -bottom-10 end-[-2rem] sm:end-[6%] h-56 sm:h-80 w-auto opacity-10 rotate-12" />

      <div className="relative max-w-7xl mx-auto px-5 pt-8 pb-9 sm:pt-14 sm:pb-14">
        <h1 className="max-w-2xl text-[1.75rem] leading-snug sm:text-5xl sm:leading-tight font-extrabold text-white">
          {isEn ? brand.heroTitleEn : brand.heroTitle}
        </h1>

        <p className="mt-3 max-w-xl text-base sm:text-lg text-gray-300">
          {isEn ? brand.heroSubtitleEn : brand.heroSubtitle}
        </p>

        <Link
          to="/promotions"
          className="relative mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-yellow-400 hover:bg-yellow-300 text-gray-950 text-sm font-bold shadow-lg shadow-yellow-400/30 transition"
        >
          <span className="absolute -top-1 -end-1 flex w-3 h-3" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative w-3 h-3 rounded-full bg-red-500 ring-2 ring-gray-950" />
          </span>
          <Gift size={17} />
          {t("home.hero.promotions")}
          <ArrowLeft size={16} className="ltr:rotate-180" />
        </Link>
      </div>
    </section>
  );
}

export default HomeHero;
