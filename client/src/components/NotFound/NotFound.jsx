import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";

// صفحه‌ی «پیدا نشد»: آدرس نامعتبر (path="*")، و محصول/خودرویی که با این شناسه نیست.
// message: متن اختصاصی‌تر به‌جای «صفحه پیدا نشد» (مثلاً «محصول پیدا نشد»)
function NotFound({ message }) {
  const { t } = useContext(LanguageContext);
  const title = message || t("notFoundPage.title");
  usePageMeta(title, t("notFoundPage.text"));

  return (
    <section className="px-5 py-20 text-center max-w-xl mx-auto">
      <p className="text-6xl font-black text-yellow-400" aria-hidden="true">
        404
      </p>

      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h1>

      <p className="mt-3 text-gray-600">{t("notFoundPage.text")}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 px-6 py-3 rounded-xl font-bold transition"
        >
          {t("notFoundPage.home")}
        </Link>

        <Link
          to="/products"
          className="bg-gray-950 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition"
        >
          {t("notFoundPage.products")}
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
