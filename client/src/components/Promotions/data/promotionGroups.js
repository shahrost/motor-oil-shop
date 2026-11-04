import antifreezePlan from "../../../assets/bundles/petrolex-antifreeze-1kg-plan.webp";
import bundle1 from "../../../assets/bundles/behtam-bundle-1.webp";
import bundle2 from "../../../assets/bundles/behtam-bundle-2.webp";

// کارت‌های صفحه‌ی طرح فروش. images: جدول آماده‌ی طرح‌ها؛ skus: محصولی که طرح هدیه نداره ولی مال این
// کارته (مثل سبدها). محصولات طرح‌دار از روی brands خودکار وارد گروه می‌شن و برندی که اینجا نیست
// کارت خودش رو می‌گیره
export const PROMOTION_GROUPS = [
  {
    id: "seman",
    brands: ["سمن شیمی", "پترولکس"],
    images: [
      {
        src: antifreezePlan,
        width: 1044,
        height: 521,
        alt: "طرح فروش ضدیخ ۱ کیلویی پترولکس: نقدی هر ۴ کارتن ۱ کارتن اشانتیون، چکی هر ۶ کارتن ۱ کارتن اشانتیون",
      },
    ],
  },
  { id: "lookini", brands: ["لوکینی"], images: [] },
  {
    id: "bundles",
    titleKey: "promotions.bundlesTitle",
    countKey: "promotions.bundleCount",
    brands: [],
    skus: ["BT-BUNDLE-1", "BT-BUNDLE-2"],
    images: [
      { src: bundle1, width: 708, height: 401, alt: "جدول سبد ترکیبی ۱ بهتام" },
      { src: bundle2, width: 777, height: 258, alt: "جدول سبد ترکیبی ۲ بهتام" },
    ],
  },
];
