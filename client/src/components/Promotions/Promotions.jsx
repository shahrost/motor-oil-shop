import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import getBrandLabel from "../../utils/brandLabel";
import usePromotionGroups from "./hooks/usePromotionGroups";
import { PromotionGroupCard, PromotionGroupDetail } from "./sections";

function Promotions() {
  const { groups, selectedGroup, loading } = usePromotionGroups();
  const { language, t } = useContext(LanguageContext);
  usePageMeta(t("promotions.title"), t("meta.promotions"));

  const titleOf = (group) =>
    group.titleKey
      ? t(group.titleKey)
      : group.brands.map((brand) => getBrandLabel(brand, language)).join(t("promotions.and"));

  if (selectedGroup) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-8">
        <PromotionGroupDetail group={selectedGroup} title={titleOf(selectedGroup)} t={t} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-extrabold text-center">
        {t("promotions.title")}
      </h1>

      <p className="text-center mt-3 text-gray-600">
        {t("promotions.subtitle")}
      </p>

      {/* تا اولین پاسخ سرور اسکلت کارت‌ها */}
      {loading ? (
        <div aria-hidden="true" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="h-52 rounded-2xl border-2 border-amber-300 bg-amber-50 animate-pulse motion-reduce:animate-none"
            />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <p className="text-center text-red-500 mt-10 font-bold">
          {t("promotions.notFound")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {groups.map((group) => (
            <PromotionGroupCard key={group.id} group={group} title={titleOf(group)} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Promotions;
