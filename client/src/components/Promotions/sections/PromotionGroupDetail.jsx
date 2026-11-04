import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import GroupLogos from "./GroupLogos";
import PlanImage from "./PlanImage";
import PromotionProduct from "./PromotionProduct";

// طرح‌های یک گروه: محصولات با کنترل خرید + جدول‌های آماده‌ی طرح
function PromotionGroupDetail({ group, title, t }) {
  return (
    <div>
      <Link
        to="/promotions"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-amber-700 transition"
      >
        <ArrowRight size={18} className="ltr:rotate-180" aria-hidden="true" />
        {t("promotions.back")}
      </Link>

      <div className="flex items-center gap-4 mt-5">
        <GroupLogos brands={group.brands} />
        <h1 className="text-2xl sm:text-3xl font-extrabold">{title}</h1>
      </div>

      {group.products.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {group.products.map((product) => (
            <PromotionProduct key={product.id} product={product} t={t} />
          ))}
        </div>
      )}

      {group.images.length > 0 && (
        <div
          className={`mt-6 ${
            group.images.length === 1
              ? "max-w-2xl mx-auto"
              : "grid grid-cols-1 lg:grid-cols-2 gap-5 items-start"
          }`}
        >
          {group.images.map((image) => (
            <PlanImage key={image.src} image={image} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PromotionGroupDetail;
