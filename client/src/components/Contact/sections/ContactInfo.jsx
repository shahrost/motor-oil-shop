import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import LocationPinIcon from "../../common/LocationPinIcon";

function ContactInfo() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="mt-10 bg-gray-100 rounded-xl p-6 text-center overflow-hidden">
      <LocationPinIcon className="mx-auto h-12 w-8 drop-shadow" />

      <h2 className="mt-3 text-xl font-bold">{t("contact.info.areaTitle")}</h2>

      <p className="mt-3 wrap-break-word">{t("contact.info.areaText")}</p>
    </div>
  );
}

export default ContactInfo;
