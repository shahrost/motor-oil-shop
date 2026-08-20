import { useContext } from "react";
import whatsappLogo from "../../../assets/social/whatsapp.svg";
import LanguageContext from "../../../context/LanguageContext";

function FloatingActions() {
  const { t } = useContext(LanguageContext);

  return (
    <>
      {/* دکمه شناور واتساپ */}
      <a
        href="https://wa.me/989198334264"
        target="_blank"
        rel="noreferrer"
        className="
          fixed
          bottom-6
          right-6
          bg-green-600
          text-white
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          shadow-xl
          z-50
        "
      >
        <img src={whatsappLogo} alt={t("header.whatsapp")} className="w-8 h-8" />
      </a>

      {/* دکمه تماس */}
      <a
        href="tel:09198334264"
        className="
          fixed
          bottom-6
          left-6
          bg-blue-600
          text-white
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          text-2xl
          shadow-xl
          z-50
        "
      >
        📞
      </a>
    </>
  );
}

export default FloatingActions;
