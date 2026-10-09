import { useContext } from "react";

import brandLogo from "../../../../assets/logo/shahram-monogram-yellow.svg";
import LanguageContext from "../../../../context/LanguageContext";

// لوگو، نام فروشگاه و معرفی کوتاه بالای فوتر
function FooterBrand() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <img
          src={brandLogo}
          alt=""
          className="h-8 md:h-9 w-auto select-none"
          draggable="false"
        />

        <h2 className="text-yellow-400 text-2xl md:text-3xl font-extrabold">
          {t("site.name")}
        </h2>
      </div>

      <p className="text-gray-300 leading-8 max-w-xl mx-auto">
        {t("footer.tagline")}
      </p>

      <p className="text-gray-400 mt-3">shahram_roghan</p>
    </div>
  );
}

export default FooterBrand;
