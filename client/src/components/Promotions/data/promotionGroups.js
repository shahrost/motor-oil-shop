import antifreezePlan from "../../../assets/bundles/petrolex-antifreeze-1kg-plan.webp";
import bundle1 from "../../../assets/bundles/behtam-bundle-1.webp";
import bundle2 from "../../../assets/bundles/behtam-bundle-2.webp";

// کارت‌های صفحه‌ی طرح فروش؛ برای افزودن طرح عکسی یا سبد فقط images گروهش عوض بشه.
// محصولات طرح‌دار از روی brands خودکار وارد گروه می‌شن. برندی که اینجا نیست کارت خودش رو می‌گیره.
// label: اسم طرح در پیام سفارش واتساپ
export const PROMOTION_GROUPS = [
  {
    id: "seman",
    brands: ["سمن شیمی", "پترولکس"],
    images: [
      {
        src: antifreezePlan,
        width: 1044,
        height: 521,
        label: "طرح فروش ضدیخ ۱ کیلویی پترولکس",
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
    images: [
      { src: bundle1, width: 708, height: 401, label: "سبد ترکیبی ۱ بهتام", alt: "سبد ترکیبی ۱ بهتام" },
      { src: bundle2, width: 777, height: 258, label: "سبد ترکیبی ۲ بهتام", alt: "سبد ترکیبی ۲ بهتام" },
    ],
  },
];
