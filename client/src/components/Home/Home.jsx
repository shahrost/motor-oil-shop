import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";

import HomeSearch from "./sections/HomeSearch";
import QuickFilter from "./sections/QuickFilter";
import BrandProductRows from "./sections/BrandProductRows";
import SalesBanner from "./sections/SalesBanner";
import FloatingActions from "./sections/FloatingActions";

function Home() {
  const { t } = useContext(LanguageContext);

  return (
    <div>
      <HomeSearch />

      <section className="px-5 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-black">
            {t("home.productsTitle")}
          </h2>

          <p className="text-center text-gray-600 mt-3">
            {t("home.productsSubtitle")}
          </p>
        </div>
      </section>

      <BrandProductRows />

      <SalesBanner />

      <QuickFilter />

      <FloatingActions />
    </div>
  );
}

export default Home;
