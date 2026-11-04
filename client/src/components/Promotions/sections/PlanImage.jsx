import whatsappLogo from "../../../assets/social/whatsapp.svg";
import { whatsappMessageUrl } from "../../../utils/whatsappLink";

// طرح یا سبد آماده (عکس): کلیک روی عکس نسخه‌ی کامل رو در تب جدا باز می‌کنه (روی گوشی جدول ریز می‌شه).
// این طرح‌ها محصول قابل‌افزودن به سبد ندارن، پس سفارش با پیام آماده در واتساپه
function PlanImage({ image, t }) {
  const orderUrl = whatsappMessageUrl(t("promotions.orderMessage").replace("{name}", image.label));

  return (
    <div className="space-y-2">
      <a
        href={image.src}
        target="_blank"
        rel="noopener"
        title={t("promotions.bundlesHint")}
        className="block border-2 border-amber-300 rounded-2xl overflow-hidden bg-white hover:shadow-md transition cursor-zoom-in"
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="w-full h-auto"
        />
      </a>

      <a
        href={orderUrl}
        target="_blank"
        rel="noreferrer"
        className="w-full h-10 flex items-center justify-center gap-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition"
      >
        <img src={whatsappLogo} alt="" aria-hidden="true" className="w-4 h-4" />
        {t("promotions.orderOnWhatsapp")}
      </a>
    </div>
  );
}

export default PlanImage;
