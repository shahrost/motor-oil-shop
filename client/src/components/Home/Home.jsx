import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";

import EntryCard from "./sections/EntryCard";
import OilDropArt from "./sections/OilDropArt";
import CarArt from "./sections/CarArt";

// صفحه‌ی اصلی: فقط دو کارت ورودی «روانکار» و «خودروهای من»
function Home() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="px-5 mt-12 mb-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <EntryCard
          to="/products"
          title={t("home.entries.lubricants.title")}
          description={t("home.entries.lubricants.description")}
          art={<OilDropArt />}
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
