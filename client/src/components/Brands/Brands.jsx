import { useContext } from "react";
import { Link } from "react-router-dom";
import brands from "../../data/brands";
import LanguageContext from "../../context/LanguageContext";

function Brands() {
  const { language, t } = useContext(LanguageContext);

  return (
    <div>
      <section className="px-5 mt-8">
        <h1 className="text-3xl font-extrabold text-center">
          {t("brands.title")}
        </h1>

        <p className="text-center mt-3 text-gray-600">{t("brands.subtitle")}</p>

        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {brands.map((brand) => {
            const label = language === "en" ? brand.nameEn : brand.name;

            return (
              <Link
                key={brand.name}
                to={`/brand/${brand.name}`}
                className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-6
                  text-center
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition
                "
              >
                <div className="h-24 flex items-center justify-center">
                  {brand.image ? (
                    <img
                      src={brand.image}
                      alt={label}
                      className="max-h-20 object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center font-extrabold text-gray-500 text-xl">
                      {label.slice(0, 1)}
                    </div>
                  )}
                </div>

                <h3 className="font-bold mt-4">{label}</h3>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Brands;
