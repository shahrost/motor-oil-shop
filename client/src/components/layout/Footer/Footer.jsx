import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import { FooterBrand, SocialLinks } from "./sections";

function Footer() {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <FooterBrand />

        <SocialLinks />

        <div
          className="
          border-t
          border-gray-700
          mt-8
          pt-5
          text-center
          text-gray-400
          text-sm
        "
        >
          © {new Date().getFullYear()} {t("site.name")} - {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
