import { Gift } from "lucide-react";
import { Link } from "react-router-dom";

import GroupLogos from "./GroupLogos";

// کارت یک گروه در صفحه‌ی طرح فروش؛ کلیک ← طرح‌های گروه با امکان سفارش
function PromotionGroupCard({ group, title, t }) {
  const planCount = group.products.length + group.images.length;

  return (
    <Link
      to={`/promotions?group=${encodeURIComponent(group.id)}`}
      className="border-2 border-amber-300 bg-amber-50 rounded-2xl p-5 hover:shadow-md motion-safe:hover:-translate-y-0.5 transition flex flex-col gap-4"
    >
      <GroupLogos brands={group.brands} />

      <h2 className="font-extrabold text-xl text-gray-900">{title}</h2>

      <p className="text-amber-800 font-bold text-sm flex items-center gap-1.5">
        <Gift size={16} aria-hidden="true" />
        {t(group.countKey || "promotions.planCount").replace("{count}", planCount)}
      </p>

      <span className="mt-auto h-10 flex items-center justify-center rounded-lg bg-amber-500 text-gray-950 text-sm font-bold">
        {t("promotions.viewPlans")}
      </span>
    </Link>
  );
}

export default PromotionGroupCard;
