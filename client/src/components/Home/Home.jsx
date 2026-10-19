import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";

import { GuideButton, LubricantCard, VehiclesCard } from "./sections";

// صفحه‌ی اصلی: دو کارت ورودی «روانکار» و «خودروهای من» + دکمه‌ی «راهنمای سایت»
// (justify-end: در فارسی سمت چپ، در انگلیسی سمت راست؛ همیشه بالای کارت «خودروهای من»)
function Home() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="px-5 mt-12 mb-16">
      <div className="max-w-4xl mx-auto flex justify-end mb-3">
        <GuideButton label={t("home.guide")} />
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
