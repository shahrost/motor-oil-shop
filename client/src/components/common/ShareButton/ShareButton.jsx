import { useContext } from "react";
import { Check, Link2, Share, Share2 } from "lucide-react";

import LanguageContext from "../../../context/LanguageContext";
import useShare from "./hooks/useShare";

const itemClass =
  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 hover:bg-gray-100 transition";

// دکمه‌ی اشتراک‌گذاری صفحه‌ی فعلی با منوی کوچک: تلگرام، واتس‌اپ، کپی لینک و
// (در گوشی) بقیه‌ی برنامه‌ها. text = متنی که همراه لینک فرستاده می‌شه
function ShareButton({ text, className = "" }) {
  const { t } = useContext(LanguageContext);
  const { rootRef, ...share } = useShare(text);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={share.toggle}
        aria-expanded={share.open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 rounded-full border-2 border-gray-200 bg-white px-3 py-1.5 text-sm font-bold text-gray-700 hover:border-yellow-400 hover:text-yellow-700 transition"
      >
        <Share2 />
        {t("share.button")}
      </button>

      {share.open && (
        <div
          role="menu"
          className="absolute top-full end-0 z-30 mt-2 w-52 rounded-xl border-2 border-gray-200 bg-white p-1.5 shadow-lg"
        >
          {share.links.map((link) => (
            <a
              key={link.key}
              role="menuitem"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={share.close}
              className={itemClass}
            >
              <img src={link.icon} alt="" aria-hidden="true" className="w-5 h-5" />
              {t(`share.${link.key}`)}
            </a>
          ))}

          <button type="button" role="menuitem" onClick={share.copyLink} className={itemClass}>
            {share.copied ? <Check className="text-green-600" /> : <Link2 />}
            {share.copied ? t("share.copied") : t("share.copy")}
          </button>

          {share.canShareNative && (
            <button type="button" role="menuitem" onClick={share.shareNative} className={itemClass}>
              <Share />
              {t("share.more")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ShareButton;
