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
// ردیف دکمه‌ها (موبایل و دسکتاپ): «نصب اپلیکیشن» اول ردیف و «راهنمای سایت» مثل قبل ته ردیف،
// هم‌تراز لبه‌ی کارت‌ها (در فارسی نصب سمت راست و راهنما سمت چپ؛ در انگلیسی برعکس).
// whitespace-nowrap: تا گوشی ۳۲۰px هر دو یک‌خطی می‌مونن
function Home() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="px-5 mt-12 mb-16" onClick={handleClick}>
      <div className="max-w-4xl mx-auto flex justify-between gap-3 whitespace-nowrap mb-3">
        <InstallAppButton label={t("home.installApp")} />

        <span className="ms-auto">
          <GuideButton label={t("home.guide")} />
        </span>
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
