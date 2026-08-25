import { useContext } from "react";
import { Link } from "react-router-dom";
import whatsappLogo from "../../../assets/social/whatsapp.svg";
import LanguageContext from "../../../context/LanguageContext";

function ContactActions() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
      <a
        href="https://wa.me/989198334264"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-bold"
      >
        <img src={whatsappLogo} alt="" className="w-5 h-5" />
        {t("contact.actions.whatsapp")}
      </a>

      <Link
        to="/products"
        className="inline-flex items-center justify-center bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold"
      >
        {t("common.viewProducts")}
      </Link>
    </div>
  );
}

export default ContactActions;
