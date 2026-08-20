import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function ContactInfo() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div className="bg-gray-100 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold">{t("contact.info.whatsappTitle")}</h2>

        <p className="mt-3">{t("contact.info.whatsappText")}</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold">{t("contact.info.salesTitle")}</h2>

        <p className="mt-3">{t("contact.info.salesText")}</p>
      </div>

      <div className="bg-gray-100 rounded-xl p-6 text-center overflow-hidden">
        <h2 className="text-xl font-bold">{t("contact.info.areaTitle")}</h2>

        <p className="mt-3 wrap-break-word">{t("contact.info.areaText")}</p>
      </div>
    </div>
  );
}

export default ContactInfo;
