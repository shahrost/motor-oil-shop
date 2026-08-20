import { createContext, useEffect, useState } from "react";
import translations from "../i18n/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "fa",
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  function t(key) {
    const value = key
      .split(".")
      .reduce((obj, part) => obj?.[part], translations[language]);

    return value ?? key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
