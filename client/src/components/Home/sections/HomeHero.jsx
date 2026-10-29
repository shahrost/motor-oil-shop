import { useContext } from "react";
import { Link } from "react-router-dom";
import { Gift } from "lucide-react";

import LanguageContext from "../../../context/LanguageContext";
import brand from "../../../data/brand";
import OilDropArt from "./OilDropArt";

// بخش معرفی بالای صفحه‌ی اصلی: هم‌رنگ هدر (سرمه‌ای)، تیتر و زیرتیتر از data/brand.js
// و فقط یک دکمه‌ی «طرح‌های فروش» به شکل خودروی زرد با دود اگزوز (انیمیشن‌ها در index.css).
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

        {/* خودرو رو به جلو (سمت پایان)؛ اگزوز و دود سمت شروع. ms-12 جا برای دود باز می‌کنه */}
        <Link
          to="/promotions"
          className="group relative mt-5 ms-12 inline-block pt-4 pb-3 transition-transform hover:-translate-x-1 ltr:hover:translate-x-1"
        >
          <span className="car-idle relative block">
            {/* کابین با دو شیشه */}
            <span
              className="absolute -top-4 start-[18%] end-[28%] h-5 flex gap-1 px-1.5 pt-1 rounded-t-2xl bg-yellow-400 group-hover:bg-yellow-300 transition-colors"
              aria-hidden="true"
            >
              <span className="flex-1 rounded-ss-xl rounded-se-sm bg-sky-200/80" />
              <span className="flex-1 rounded-se-xl rounded-ss-sm bg-sky-200/80" />
            </span>

            {/* بدنه: چراغ عقب قرمز سمت شروع، چراغ جلو سمت پایان */}
            <span className="relative flex items-center gap-2 h-10 ps-5 pe-6 rounded-s-lg rounded-e-[1.25rem] bg-yellow-400 group-hover:bg-yellow-300 text-gray-950 text-sm font-bold shadow-lg shadow-yellow-400/30 transition-colors">
              <span className="absolute start-0 top-2 w-1.5 h-3 rounded-e bg-red-500" aria-hidden="true" />
              <span className="absolute end-1 top-2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" aria-hidden="true" />
              <Gift size={17} />
              {t("home.hero.promotions")}
            </span>
          </span>

          {/* چرخ‌ها */}
          {["start-3", "end-4"].map((pos) => (
            <span
              key={pos}
              className={`absolute bottom-0 ${pos} w-6 h-6 rounded-full bg-gray-800 ring-[3px] ring-gray-950 flex items-center justify-center`}
              aria-hidden="true"
            >
              <span className="car-wheel w-3 h-3 rounded-full border-2 border-dashed border-gray-300" />
            </span>
          ))}

          {/* اگزوز و دود */}
          <span className="absolute -start-1.5 bottom-4 w-2 h-1.5 rounded-sm bg-gray-400" aria-hidden="true" />
          <span className="car-smoke absolute -start-4 bottom-3.5 w-3 h-3 rounded-full bg-gray-200/90" aria-hidden="true" />
          <span
            className="car-smoke absolute -start-7 bottom-5 w-4 h-4 rounded-full bg-gray-200/70"
            style={{ animationDelay: "-0.6s" }}
            aria-hidden="true"
          />
          <span
            className="car-smoke absolute -start-11 bottom-7 w-5 h-5 rounded-full bg-gray-200/50"
            style={{ animationDelay: "-1.2s" }}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}

export default HomeHero;
