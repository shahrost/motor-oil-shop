import antifreezePlan from "../../../assets/bundles/petrolex-antifreeze-1kg-plan.webp";
import ImageTables from "./ImageTables";

// جدول طرح‌های فروش (عکس آماده)؛ برای افزودن/حذف طرح فقط همین آرایه عوض بشه
const SALE_PLANS = [
  {
    src: antifreezePlan,
    width: 1044,
    height: 521,
    alt: "طرح فروش ضدیخ ۱ کیلویی پترولکس: نقدی هر ۴ کارتن ۱ کارتن اشانتیون، چکی هر ۶ کارتن ۱ کارتن اشانتیون",
  },
];

function SalePlanImages({ t }) {
  return (
    <ImageTables
      title={t("promotions.salePlansTitle")}
      hint={t("promotions.bundlesHint")}
      images={SALE_PLANS}
    />
  );
}

export default SalePlanImages;
