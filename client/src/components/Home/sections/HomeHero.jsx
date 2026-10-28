import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Car, Phone } from "lucide-react";

import LanguageContext from "../../../context/LanguageContext";
import brand from "../../../data/brand";
import { WHATSAPP_URL, PHONE_URL, PHONE_DISPLAY } from "../../../data/contact";
import { toPersianDigits } from "../../../utils/digits";
import whatsappLogo from "../../../assets/social/whatsapp.svg";
import OilDropArt from "./OilDropArt";

const BUTTON =
  "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl font-bold transition";

// بخش معرفی بالای صفحه‌ی اصلی: هم‌رنگ هدر (سرمه‌ای)، تیتر و زیرتیتر از data/brand.js،
// دو دکمه‌ی اصلی و لینک کوچیک واتساپ/تماس. قطره‌ی کم‌رنگ گوشه فقط تزئینیه.
// روی موبایل کوتاه می‌مونه (حدود ۳۵۰px) تا بخش‌های بعدی هم دیده بشن
function HomeHero() {
  const { language, t } = useContext(LanguageContext);
  const isEn = language === "en";
  const phone = isEn ? PHONE_DISPLAY : toPersianDigits(PHONE_DISPLAY);

  return (
    <section className="relative overflow-hidden bg-gray-950 text-white">
      <OilDropArt className="pointer-events-none absolute -bottom-10 end-[-2rem] sm:end-[6%] h-56 sm:h-80 w-auto opacity-10 rotate-12" />

      <div className="relative max-w-7xl mx-auto px-5 pt-8 pb-10 sm:pt-14 sm:pb-16">
        <h1 className="max-w-2xl text-[1.75rem] leading-snug sm:text-5xl sm:leading-tight font-extrabold text-white">
          {isEn ? brand.heroTitleEn : brand.heroTitle}
        </h1>

        <p className="mt-3 max-w-xl text-base sm:text-lg text-gray-300">
          {isEn ? brand.heroSubtitleEn : brand.heroSubtitle}
        </p>

        <div className="mt-6 grid grid-cols-1 sm:flex gap-3">
          <Link
            to="/products"
            className={`${BUTTON} bg-yellow-400 hover:bg-yellow-300 text-gray-950 shadow-lg shadow-yellow-400/20`}
          >
            {t("home.hero.viewProducts")}
            <ArrowLeft size={18} className="ltr:rotate-180" />
          </Link>

          <Link
            to="/vehicles"
            className={`${BUTTON} bg-white/10 hover:bg-white/20 ring-1 ring-white/25 text-white`}
          >
            <Car size={18} />
            {t("home.hero.findOil")}
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-yellow-400 transition"
          >
            <img src={whatsappLogo} alt="" aria-hidden="true" className="w-5 h-5" />
            {t("home.hero.whatsapp")}
          </a>

          <a href={PHONE_URL} className="inline-flex items-center gap-1.5 hover:text-yellow-400 transition">
            <Phone size={16} />
            {t("home.hero.call")}
            <span dir="ltr">{phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
