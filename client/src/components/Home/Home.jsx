import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";

import { EntryCard, LubricantCard, CarArt } from "./sections";

// صفحه‌ی اصلی: فقط دو کارت ورودی «روانکار» و «خودروهای من»
function Home() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="px-5 mt-12 mb-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <LubricantCard
          to="/products"
          title={t("home.entries.lubricants.title")}
          description={t("home.entries.lubricants.description")}
        />

        <EntryCard
          to="/vehicles"
          title={t("home.entries.myVehicles.title")}
          description={t("home.entries.myVehicles.description")}
          art={<CarArt />}
        />
      </div>
    </section>
  );
}

export default Home;
