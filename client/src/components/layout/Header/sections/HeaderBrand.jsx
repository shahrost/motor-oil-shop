import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../../context/LanguageContext";

import ownerPhoto from "../../../../assets/logo/shahram-avatar.webp";
import brandLogo from "../../../../assets/logo/shahram-monogram-yellow.svg";

function HeaderBrand({ onPhotoClick }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="flex items-center gap-3">
      <Link to="/" aria-label={t("nav.home")} className="shrink-0">
        <img
          src={brandLogo}
          alt={t("site.name")}
          className="h-9 md:h-10 w-auto select-none"
          draggable="false"
        />
      </Link>

      <Link to="/" className="leading-tight">
        <h1
          className="
          text-yellow-400
          text-lg
          sm:text-xl
          md:text-2xl
          font-black
          "
        >
          {t("site.name")}
        </h1>

        <p className="hidden sm:block text-gray-400 text-xs">shahram_roghan</p>
      </Link>

      <button
        type="button"
        onClick={onPhotoClick}
        aria-label={t("header.showPhoto")}
        className="
        hidden
        sm:flex
        w-8
        h-8
        rounded-full
        ring-2
        ring-gray-700
        overflow-hidden
        shadow
        shrink-0
        cursor-zoom-in
        "
      >
        <img
          src={ownerPhoto}
          alt="شهرام"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 12%" }}
        />
      </button>
    </div>
  );
}

export default HeaderBrand;
