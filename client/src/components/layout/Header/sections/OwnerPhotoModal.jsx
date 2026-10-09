import { useContext } from "react";

import LanguageContext from "../../../../context/LanguageContext";

import ownerPhoto from "../../../../assets/logo/shahram-logo.webp";
import useEscapeKey from "../hooks/useEscapeKey";

// نمایش بزرگ عکس شهرام؛ با کلیک بیرون عکس یا کلید Escape بسته می‌شه
function OwnerPhotoModal({ onClose }) {
  const { t } = useContext(LanguageContext);

  useEscapeKey(onClose);

  return (
    <div
      onClick={onClose}
      className="
      fixed
      inset-0
      z-60
      bg-black/80
      flex
      items-center
      justify-center
      p-6
      "
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t("header.close")}
        className="
        absolute
        top-5
        left-5
        text-white
        text-4xl
        leading-none
        "
      >
        ✕
      </button>

      <img
        src={ownerPhoto}
        alt="شهرام"
        onClick={(e) => e.stopPropagation()}
        className="
        max-h-[90vh]
        max-w-[90vw]
        object-contain
        rounded-2xl
        shadow-2xl
        "
      />
    </div>
  );
}

export default OwnerPhotoModal;
