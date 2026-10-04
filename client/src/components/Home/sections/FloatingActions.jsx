import { useContext } from "react";
import whatsappLogo from "../../../assets/social/whatsapp.svg";
import LanguageContext from "../../../context/LanguageContext";
import { WHATSAPP_URL, PHONE_URL } from "../../../data/contact";

function FloatingActions() {
  const { t } = useContext(LanguageContext);

  return (
    <>
      {/* دکمه شناور واتساپ */}
      <a
        href={WHATSAPP_URL}
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
        href={PHONE_URL}
        className="
          fixed
          bottom-6
          left-6
          bg-gray-900
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
