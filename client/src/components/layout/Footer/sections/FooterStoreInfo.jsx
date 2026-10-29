import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../../context/LanguageContext";
import brand from "../../../../data/brand";
import { PHONE_DISPLAY, PHONE_URL } from "../../../../data/contact";

// آدرس، ساعت کاری، تلفن ثابت و همراه فروشگاه (از data/brand.js و data/contact.js) + لینک «درباره ما»
function FooterStoreInfo() {
  const { t } = useContext(LanguageContext);

  const rows = [
    { key: "address", value: brand.address },
    { key: "hours", value: brand.hours },
    { key: "landline", value: brand.landline, href: brand.landlineUrl },
    { key: "mobile", value: PHONE_DISPLAY, href: PHONE_URL },
  ];

  return (
    <div className="mt-8 text-center text-sm text-gray-300 space-y-2">
      {rows.map((row) => (
        <p key={row.key} className="wrap-break-word">
          <span className="text-gray-400">{t(`about.store.${row.key}`)}: </span>
          {row.href ? (
            <a href={row.href} dir="ltr" className="hover:text-yellow-400">
              {row.value}
            </a>
          ) : (
            row.value
          )}
        </p>
      ))}

      <Link
        to="/about"
        className="inline-block mt-2 font-bold text-yellow-400 hover:text-yellow-300"
      >
        {t("nav.about")}
      </Link>
    </div>
  );
}

export default FooterStoreInfo;
