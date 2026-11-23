import { useContext } from "react";
import { MessageSquare } from "lucide-react";
import LanguageContext from "../../context/LanguageContext";
import { smsMessageUrl } from "../../utils/smsLink";

export default function BrandSaleNotice({ brand, className = "" }) {
  const { t } = useContext(LanguageContext);
  return <a href={smsMessageUrl(t("productCard.inquiryMessage").replace("{name}", brand))}
    className={`flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-bold text-amber-900 ${className}`}>
    <MessageSquare size={18} aria-hidden="true" />{t("productCard.inquirySms")}
  </a>;
}
