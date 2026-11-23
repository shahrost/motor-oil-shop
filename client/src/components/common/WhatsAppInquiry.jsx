import whatsappLogo from "../../assets/social/whatsapp.svg";
import { whatsappMessageUrl } from "../../utils/whatsappLink";
import { smsMessageUrl } from "../../utils/smsLink";
import { MessageSquare } from "lucide-react";

// محصول بی‌قیمت: به‌جای دکمه‌ی غیرفعال، «استعلام در واتساپ» با پیام آماده (اسم و کد کالا)؛
// کارت باریک فقط «استعلام قیمت» (والد @container داره). کارت محصول و نوار پایین صفحه‌ی محصول
function WhatsAppInquiry({ product, t, className = "mt-2" }) {
  const message = [
    t("productCard.inquiryMessage").replace("{name}", product.name),
    product.sku ? t("productCard.inquirySku").replace("{sku}", product.sku) : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (product.salesClosed) return <a href={smsMessageUrl(message)}
    className={`${className} flex min-h-11 w-full items-center justify-center gap-1 rounded-lg bg-amber-600 px-1 py-2 text-center text-xs font-bold leading-6 text-white hover:bg-amber-700`}>
    <MessageSquare size={16} className="shrink-0" aria-hidden="true" />
    <span>{t("productCard.inquirySms")}</span>
  </a>;

  return (
    <a
      href={whatsappMessageUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={`${className} w-full h-9 flex items-center justify-center gap-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold whitespace-nowrap transition`}
    >
      <img src={whatsappLogo} alt="" aria-hidden="true" className="w-4 h-4" />
      <span className="@min-[11rem]:hidden">{t("productCard.inquiryShort")}</span>
      <span className="hidden @min-[11rem]:inline">{t("productCard.inquiry")}</span>
    </a>
  );
}

export default WhatsAppInquiry;
