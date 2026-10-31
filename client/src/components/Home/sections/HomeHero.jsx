import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import brand from "../../../data/brand";
import OilDropArt from "./OilDropArt";
import PromoLimo from "./PromoLimo";

// بخش معرفی بالای صفحه‌ی اصلی: هم‌رنگ هدر (سرمه‌ای)، تیتر و زیرتیتر از data/brand.js
// و فقط یک دکمه‌ی «طرح فروش و سبد کالا» به شکل لیموزین زرد (PromoLimo).
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

        <PromoLimo label={t("home.hero.promotions")} />
      </div>
    </section>
  );
}

export default HomeHero;
