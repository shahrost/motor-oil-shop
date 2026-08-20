import { useContext } from "react";
import whatsappLogo from "../../../assets/social/whatsapp.svg";
import LanguageContext from "../../../context/LanguageContext";

function SalesBanner() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="px-5 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="bg-yellow-400 rounded-3xl p-8 text-center shadow-md">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            {t("home.salesBanner.title")}
          </h2>

          <p className="mt-4 text-gray-800 leading-8">
            {t("home.salesBanner.text")}
          </p>

          <a
            href="https://wa.me/989198334264"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition"
          >
            <img src={whatsappLogo} alt="" className="w-5 h-5" />
            {t("home.salesBanner.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default SalesBanner;
