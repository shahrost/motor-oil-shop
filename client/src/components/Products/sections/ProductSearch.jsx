import { useContext } from "react";
import { Search } from "lucide-react";
import LanguageContext from "../../../context/LanguageContext";

function ProductSearch({ search, setSearch }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="max-w-5xl sm:max-w-md mx-auto bg-white rounded-3xl shadow p-3 sm:p-2 flex gap-2">
      <input
        type="text"
        placeholder={t("products.filters.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          flex-1
          min-w-0
          border
          border-gray-300
          rounded-2xl
          p-3
          sm:p-2
          text-black
          outline-none
          focus:ring-2
          focus:ring-yellow-400
        "
      />

      <span
        className="
          shrink-0
          w-12
          sm:w-10
          rounded-2xl
          bg-yellow-400
          flex
          items-center
          justify-center
        "
      >
        <Search className="text-black" />
      </span>
    </div>
  );
}

export default ProductSearch;
