import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function HomeSearch() {
  const { t } = useContext(LanguageContext);

  return (
    <section className="px-5 mt-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow p-4">
        <input
          type="text"
          placeholder={t("home.search.placeholder")}
          className="
            w-full
            border
            border-gray-300
            rounded-2xl
            p-4
            text-black
            outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        />
      </div>
    </section>
  );
}

export default HomeSearch;
