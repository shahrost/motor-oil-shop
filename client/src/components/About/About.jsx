import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  AboutActivity,
  AboutBrands,
  PaymentMethods,
  StoreDetails,
  ContactInfo,
  ContactActions,
} from "./sections";

// «درباره ما» (جای صفحه‌ی قدیمی «تماس با ما»؛ /contact به اینجا می‌آد):
// معرفی، حوزه‌ی فعالیت، برندها، روش‌های پرداخت، اطلاعات تماس و محدوده‌ی فعالیت
function About() {
  const { t } = useContext(LanguageContext);
  usePageMeta(t("nav.about"), t("meta.about"));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <section className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          {t("about.title")}
        </h1>

        <p className="mt-6 text-lg leading-9 text-gray-700 text-center">
          {t("about.intro")}
        </p>

        <AboutActivity />

        <AboutBrands />

        <PaymentMethods />

        <StoreDetails />

        <ContactInfo />

        <ContactActions />
      </section>
    </div>
  );
}

export default About;
