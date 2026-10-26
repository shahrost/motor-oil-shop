import { useContext } from "react";

import LanguageContext from "../../../../context/LanguageContext";
import brand from "../../../../data/brand";

// نماد اعتماد الکترونیکی: کد رسمی اینماد از brand.enamadHtml همون‌طور که enamad.ir داده رندر می‌شه
// (لینک + عکس، با referrerpolicy=origin که اینماد برای تأیید دامنه لازم داره).
// تا کد چسبونده نشده، فقط کادر جایگاهش نمایش داده می‌شه.
function EnamadSeal() {
  const { t } = useContext(LanguageContext);

  if (brand.enamadHtml.trim()) {
    return (
      <div
        className="flex justify-center mt-8"
        dangerouslySetInnerHTML={{ __html: brand.enamadHtml }}
      />
    );
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="w-28 h-32 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center p-2 text-center text-xs text-gray-400">
        [{t("footer.enamad")}]
      </div>
    </div>
  );
}

export default EnamadSeal;
