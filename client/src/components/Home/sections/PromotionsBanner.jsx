import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import useHomePromotions from "../hooks/useHomePromotions";
import HomeSectionHeader from "./HomeSectionHeader";
import PromotionSlide from "./PromotionSlide";

// بنر طرح‌های فروش فعال (ردیف افقی قابل‌اسکرول)؛ بدون طرح فعال اصلاً نمایش داده نمی‌شه.
// یک کارت ← تمام‌عرض؛ بیشتر ← روی موبایل ۸۵٪ تا کارت بعدی پیدا باشه
function PromotionsBanner() {
  const { t } = useContext(LanguageContext);
  const groups = useHomePromotions();

  if (groups.length === 0) return null;

  const width =
    groups.length === 1
      ? "w-full lg:w-[calc((100%_-_1.5rem)/3)]"
      : "w-[85%] sm:w-[calc((100%_-_0.75rem)/2)] lg:w-[calc((100%_-_1.5rem)/3)]";

  return (
    <section className="max-w-7xl mx-auto mt-8">
      <HomeSectionHeader
        title={t("promotions.title")}
        to="/promotions"
        linkLabel={t("home.promotions.all")}
      />

      <div className="flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
        {groups.map((group) => (
          <PromotionSlide key={group.key} group={group} className={`flex-none ${width}`} />
        ))}
      </div>
    </section>
  );
}

export default PromotionsBanner;
