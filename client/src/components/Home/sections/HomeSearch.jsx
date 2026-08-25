import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";

function HomeSearch() {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = query.trim();

    navigate(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : "/products");
  }

  return (
    <section className="px-5 mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow p-4 flex gap-3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("home.search.placeholder")}
          className="
            flex-1
            min-w-0
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

        <button
          type="submit"
          aria-label={t("home.search.button")}
          className="
            shrink-0
            w-14
            rounded-2xl
            bg-yellow-400
            hover:bg-yellow-500
            transition
            flex
            items-center
            justify-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </section>
  );
}

export default HomeSearch;
