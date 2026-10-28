import whatsappLogo from "../../../assets/social/whatsapp.svg";
import { whatsappMessageUrl } from "../../../utils/whatsappLink";

// محصول بی‌قیمت: به‌جای دکمه‌ی غیرفعال، «استعلام در واتساپ» با پیام آماده (اسم و کد کالا)؛
// کارت باریک فقط «استعلام قیمت»
function WhatsAppInquiry({ product, t }) {
  const message = [
    t("productCard.inquiryMessage").replace("{name}", product.name),
    product.sku ? t("productCard.inquirySku").replace("{sku}", product.sku) : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={whatsappMessageUrl(message)}
      target="_blank"
      rel="noreferrer"
      className="mt-2 w-full h-9 flex items-center justify-center gap-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold whitespace-nowrap transition"
    >
      <img src={whatsappLogo} alt="" aria-hidden="true" className="w-4 h-4" />
      <span className="@min-[11rem]:hidden">{t("productCard.inquiryShort")}</span>
      <span className="hidden @min-[11rem]:inline">{t("productCard.inquiry")}</span>
    </a>
  );
}

export default WhatsAppInquiry;
