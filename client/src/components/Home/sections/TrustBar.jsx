import { useContext } from "react";
import { Banknote, Clock, MessageCircle, Truck } from "lucide-react";

import LanguageContext from "../../../context/LanguageContext";
import brand from "../../../data/brand";
import { WHATSAPP_URL } from "../../../data/contact";

const ITEM = "flex items-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4";
const ICON =
  "shrink-0 w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 dark:text-yellow-400 flex items-center justify-center";

// نوار اعتماد ته صفحه‌ی اصلی: پرداخت، محدوده‌ی ارسال و ساعت کاری (متن‌ها از data/brand.js)،
// و لینک واتساپ. موبایل دو ستونه، دسکتاپ چهار ستونه
function TrustBar() {
  const { language, t } = useContext(LanguageContext);
  const isEn = language === "en";

  const items = [
    { key: "payment", Icon: Banknote, title: t("home.trust.payment") },
    { key: "delivery", Icon: Truck, title: isEn ? brand.deliveryAreaEn : brand.deliveryArea },
    {
      key: "hours",
      Icon: Clock,
      title: `${t("home.trust.hours")} ${isEn ? brand.hoursEn : brand.hours}`,
    },
    { key: "whatsapp", Icon: MessageCircle, title: t("home.trust.whatsapp"), href: WHATSAPP_URL },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map(({ key, Icon, title, href }) => {
          const content = (
            <>
              <span className={ICON}>
                <Icon size={20} />
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-800 leading-5">{title}</span>
            </>
          );

          return (
            <li key={key} className="flex">
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${ITEM} w-full hover:border-yellow-400 hover:shadow-md transition`}
                >
                  {content}
                </a>
              ) : (
                <div className={`${ITEM} w-full`}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default TrustBar;
