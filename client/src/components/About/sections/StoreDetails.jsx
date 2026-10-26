import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import brand from "../../../data/brand";
import { PHONE_DISPLAY, PHONE_URL } from "../../../data/contact";

// آدرس، ساعت کاری و تلفن‌های فروشگاه (مقدارها از data/brand.js)
function StoreDetails() {
  const { t } = useContext(LanguageContext);

  const rows = [
    { key: "address", value: brand.address },
    { key: "hours", value: brand.hours },
    { key: "landline", value: brand.landline },
    { key: "mobile", value: PHONE_DISPLAY, href: PHONE_URL },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center">{t("about.store.title")}</h2>

      <dl className="mt-6 bg-gray-100 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {rows.map((row) => (
          <div key={row.key}>
            <dt className="text-sm text-gray-500">{t(`about.store.${row.key}`)}</dt>
            <dd className="mt-1 font-bold wrap-break-word">
              {row.href ? (
                <a href={row.href} dir="ltr" className="hover:text-yellow-700">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default StoreDetails;
