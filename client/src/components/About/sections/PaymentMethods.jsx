import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import brand from "../../../data/brand";

const METHODS = ["cash", "check"];

// روش‌های پرداخت: نقدی و چکی
function PaymentMethods() {
  const { language, t } = useContext(LanguageContext);
  // شرایط چکی از data/brand.js؛ خالی ← جمله‌ی «شرایط: …» حذف
  const checkTerms = language === "en" ? brand.checkTermsEn : brand.checkTerms;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center">{t("about.payment.title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {METHODS.map((method) => (
          <div key={method} className="bg-gray-100 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold">{t(`about.payment.${method}`)}</h3>
            <p className="mt-3 text-gray-700">{t(`about.payment.${method}Text`)}</p>

            {method === "check" && checkTerms && (
              <p className="mt-2 text-gray-700">
                {t("about.payment.checkTerms").replace("{terms}", checkTerms)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
