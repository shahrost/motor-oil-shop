import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";

import {
  BrandStrip,
  FeaturedProducts,
  GuideButton,
  HomeHero,
  InstallAppButton,
  LubricantCard,
  PromotionsBanner,
  TrustBar,
  VehiclesCard,
} from "./sections";
import { freezeAnimations } from "./helpers/animate";

// Link روتر فقط وقتی خودش ناوبری رو انجام بده preventDefault می‌کنه (نه کلیک با Ctrl یا تب جدید)
function handleClick(event) {
  if (event.defaultPrevented && event.target.closest("a")) {
    freezeAnimations(event.currentTarget);
  }
}

// صفحه‌ی اصلی از بالا به پایین: بخش معرفی (Hero) ← ردیف کوچیک «نصب اپلیکیشن» / «راهنمای سایت»
// ← بنر طرح‌های فروش ← دسترسی سریع («روانکار» و «خودروهای من») ← نوار برندها ← محصولات پیشنهادی ← نوار اعتماد.
// ردیف دکمه‌ها: «نصب اپلیکیشن» اول ردیف و «راهنمای سایت» ته ردیف (در فارسی نصب سمت راست
// و راهنما سمت چپ؛ در انگلیسی برعکس). whitespace-nowrap: تا گوشی ۳۲۰px هر دو یک‌خطی می‌مونن
function Home() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="mb-16" onClick={handleClick}>
      <HomeHero />

      <div className="px-5">
        <div className="max-w-7xl mx-auto flex justify-between gap-3 whitespace-nowrap mt-4">
          <InstallAppButton label={t("home.installApp")} />

          <span className="ms-auto">
            <GuideButton label={t("home.guide")} />
          </span>
        </div>

        <PromotionsBanner />

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
          <LubricantCard
            to="/products"
            title={t("home.entries.lubricants.title")}
            description={t("home.entries.lubricants.description")}
            cta={t("home.entries.lubricants.cta")}
          />

          <VehiclesCard
            to="/vehicles"
            title={t("home.entries.myVehicles.title")}
            description={t("home.entries.myVehicles.description")}
            shortDescription={t("home.entries.myVehicles.shortDescription")}
            cta={t("home.entries.myVehicles.cta")}
          />
        </div>

        <BrandStrip />

        <FeaturedProducts />

        <TrustBar />
      </div>
    </div>
  );
}

export default Home;
