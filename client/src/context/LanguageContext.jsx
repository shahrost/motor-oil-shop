import { createContext, useEffect, useMemo, useState } from "react";
import translations from "../i18n/translations";
import { getSavedLanguage, saveLanguage } from "../services/preferenceStorage";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => getSavedLanguage() || "fa",
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    saveLanguage(language);
  }, [language]);

  // value و t فقط با عوض شدن زبان نو می‌شن تا مصرف‌کننده‌ها بی‌دلیل دوباره رندر نشن
  const value = useMemo(() => {
    function t(key) {
      const text = key
        .split(".")
        .reduce((obj, part) => obj?.[part], translations[language]);

      return text ?? key;
    }

    return { language, setLanguage, t };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
