import antifreezePlan from "../../../assets/bundles/petrolex-antifreeze-1kg-plan.webp";
import brakePlan from "../../../assets/bundles/seman-brake-plan.webp";
import aidlubePlan from "../../../assets/bundles/aidlube-sales-plan.webp";
import womPlan1 from "../../../assets/bundles/wom-oil-sales-plan-1.webp";
import womPlan2 from "../../../assets/bundles/wom-oil-sales-plan-2.webp";

// کارت‌های صفحه‌ی طرح فروش. images: جدول آماده‌ی طرح‌ها.
// محصولات طرح‌دار از روی brands خودکار وارد گروه می‌شن و برندی که اینجا نیست کارت خودش رو می‌گیره.
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
      {
        src: brakePlan,
        width: 1634,
        height: 920,
        alt: "طرح فروش روغن ترمز سمن شیمی: نقدی هر ۳ کارتن ۱ کارتن اشانتیون و چکی هر ۴ کارتن ۱ کارتن اشانتیون؛ قیمت پایه ترمز آبی ۳۹۸ هزار و ترمز زرد ۳۵۱ هزار تومان",
      },
    ],
  },
  { id: "lookini", brands: ["لوکینی"], images: [] },
  {
    id: "aidlube",
    brands: ["ایدلوب"],
    images: [
      { src: aidlubePlan, width: 1920, height: 1080, alt: "شرایط فروش اعتباری ایدلوب: هر ۸ کارتن یک کارتن هدیه و شرایط هدیه عددی خرید زیر ۸ کارتن" },
    ],
  },
  {
    id: "wom-oil",
    brands: ["وم اویل"],
    images: [
      { src: womPlan1, width: 1920, height: 1080, alt: "شرایط فروش اعتباری وم اویل، روغن موتور 20W50 و دنده اتومات: هر ۵ کارتن یک کارتن هدیه و شرایط خرید زیر ۵ کارتن" },
      { src: womPlan2, width: 1920, height: 1080, alt: "شرایط فروش اعتباری وم اویل، روغن موتور 10W40، 5W40، 5W30، 0W20 و موتورسیکلت: هر ۶ کارتن یک کارتن هدیه و شرایط خرید زیر ۶ کارتن" },
    ],
  },
];
