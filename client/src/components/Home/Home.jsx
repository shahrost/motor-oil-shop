import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";

import {
  GuideButton,
  InstallAppButton,
  LubricantCard,
  VehiclesCard,
} from "./sections";
import { freezeAnimations } from "./helpers/animate";

// Link روتر فقط وقتی خودش ناوبری رو انجام بده preventDefault می‌کنه (نه کلیک با Ctrl یا تب جدید)
function handleClick(event) {
  if (event.defaultPrevented && event.target.closest("a")) {
    freezeAnimations(event.currentTarget);
  }
}

// صفحه‌ی اصلی: دو کارت ورودی «روانکار» و «خودروهای من» + دکمه‌های «نصب اپلیکیشن» و «راهنمای سایت»
// ردیف دکمه‌ها: «راهنمای سایت» مثل قبل ته ردیف (در فارسی سمت چپ، در انگلیسی سمت راست)
// و «نصب اپلیکیشن» روبه‌روش. موبایل: flex دو سر ردیف (یک‌خطی تا گوشی ۳۲۰px)؛
// دسکتاپ: گرید هم‌عرض ستون‌های کارت‌ها و «نصب اپلیکیشن» وسط ستون کارت «روانکار»
function Home() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="px-5 mt-12 mb-16" onClick={handleClick}>
      <div className="max-w-4xl mx-auto flex justify-between gap-3 whitespace-nowrap sm:grid sm:grid-cols-2 sm:gap-x-6 mb-3">
        <div className="flex justify-start sm:justify-center">
          <InstallAppButton label={t("home.installApp")} />
        </div>

        <div className="flex justify-end">
          <GuideButton label={t("home.guide")} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <LubricantCard
          to="/products"
          title={t("home.entries.lubricants.title")}
          description={t("home.entries.lubricants.description")}
        />

        <VehiclesCard
          to="/vehicles"
          title={t("home.entries.myVehicles.title")}
          description={t("home.entries.myVehicles.description")}
        />
      </div>
    </section>
  );
}

export default Home;
