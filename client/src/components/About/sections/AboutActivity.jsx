import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";

const ITEMS = ["supply", "partnership", "support"];

// حوزه‌ی فعالیت: تأمین عمده برای لوازم یدکی‌ها، اتوسرویس‌ها و مشتریان عمده
function AboutActivity() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center">{t("about.activityTitle")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {ITEMS.map((key) => (
          <div key={key} className="bg-gray-100 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold">{t(`about.${key}.title`)}</h3>
            <p className="mt-3 text-gray-700">{t(`about.${key}.text`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutActivity;
