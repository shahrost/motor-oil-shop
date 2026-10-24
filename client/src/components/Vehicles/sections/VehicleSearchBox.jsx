import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";

// کادر جستجوی خودرو در همه‌ی برندها (صفحه‌ی «خودروها»)
function VehicleSearchBox({ value, onChange, onFocus }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-3 flex items-center text-gray-400 pointer-events-none"
      >
        🔍
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={t("vehicles.searchAllPlaceholder")}
        aria-label={t("vehicles.searchAllPlaceholder")}
        enterKeyHint="search"
        className="block w-full border-2 border-gray-200 focus:border-yellow-400 outline-none rounded-xl py-3 ps-10 pe-10 bg-white text-black"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={t("vehicles.clearSearch")}
          className="absolute inset-y-0 end-2 my-auto h-8 w-8 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 font-bold"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default VehicleSearchBox;
