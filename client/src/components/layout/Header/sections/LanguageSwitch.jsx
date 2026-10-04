import { useContext } from "react";

import LanguageContext from "../../../../context/LanguageContext";

const LANGUAGES = ["en", "fa"];

// سوییچ EN/FA؛ نسخه‌ی compact برای هدر و نسخه‌ی کامل برای منوی موبایل
function LanguageSwitch({ compact = false }) {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div
      className={
        compact
          ? "flex items-center bg-gray-800 rounded-lg p-0.5 text-[11px] font-bold"
          : "flex items-center justify-center gap-2 bg-gray-800 rounded-xl p-1"
      }
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`${compact ? "px-1.5 py-1 rounded-md" : "flex-1 py-2 rounded-lg"} transition ${
            language === code
              ? "bg-yellow-400 text-black"
              : `text-gray-300 ${compact ? "hover:text-white" : ""}`
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitch;
