import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";
import useDragScroll from "./hooks/useDragScroll";

function BrandList({ brands }) {
  const { language, t } = useContext(LanguageContext);
  const { rowRef, dragHandlers } = useDragScroll();

  return (
    <section className="px-5 mt-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center">
          {t("home.brandList.title")}
        </h2>

        <div
          ref={rowRef}
          {...dragHandlers}
          className="
            flex
            gap-4
            overflow-x-auto
            mt-8
            pb-4
            scrollbar-hide
            cursor-grab
            select-none
          "
        >
          {brands.map((brand) => {
            const label = language === "en" ? brand.nameEn : brand.name;

            return (
              <Link
                key={brand.name}
                to={`/brand/${brand.name}`}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="
                  min-w-35
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-5
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition
                "
              >
                <div
                  className="
                    h-20
                    flex
                    items-center
                    justify-center
                  "
                >
                  {brand.image ? (
                    <img
                      src={brand.image}
                      alt={label}
                      draggable={false}
                      className="
                        max-h-16
                        object-contain
                      "
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center font-extrabold text-gray-500">
                      {label.slice(0, 1)}
                    </div>
                  )}
                </div>

                <h3
                  className="
                    font-bold
                    text-center
                    mt-4
                    text-sm
                  "
                >
                  {label}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BrandList;
