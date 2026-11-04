import bundle1 from "../../../assets/bundles/behtam-bundle-1.webp";
import bundle2 from "../../../assets/bundles/behtam-bundle-2.webp";
import ImageTables from "./ImageTables";

// جدول سبدهای ترکیبی (عکس آماده)؛ برای افزودن/حذف سبد فقط همین آرایه عوض بشه
const BUNDLES = [
  { src: bundle1, width: 708, height: 401, alt: "سبد ترکیبی ۱ بهتام" },
  { src: bundle2, width: 777, height: 258, alt: "سبد ترکیبی ۲ بهتام" },
];

function BundleImages({ t }) {
  return (
    <ImageTables
      title={t("promotions.bundlesTitle")}
      hint={t("promotions.bundlesHint")}
      images={BUNDLES}
    />
  );
}

export default BundleImages;
