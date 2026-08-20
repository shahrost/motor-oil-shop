import { useContext } from "react";
import { Link } from "react-router-dom";
import whatsappLogo from "../../assets/social/whatsapp.svg";
import LanguageContext from "../../context/LanguageContext";

function About() {
  const { t } = useContext(LanguageContext);

  return (
    <div>
      <section>
        <h1>{t("about.title")}</h1>

        <p className="mt-8 text-lg leading-9 text-gray-700 text-center">
          {t("about.intro")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">{t("about.supply.title")}</h2>
            <p className="mt-3">{t("about.supply.text")}</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">{t("about.partnership.title")}</h2>
            <p className="mt-3">{t("about.partnership.text")}</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">{t("about.support.title")}</h2>
            <p className="mt-3">{t("about.support.text")}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">{t("about.serviceArea.title")}</h2>

          <p className="mt-4 text-gray-700">{t("about.serviceArea.text")}</p>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold"
          >
            {t("common.viewProducts")}
          </Link>

          <a
            href="https://wa.me/989198334264"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-bold mr-4"
          >
            <img src={whatsappLogo} alt="" className="w-5 h-5" />
            {t("about.whatsappCta")}
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
