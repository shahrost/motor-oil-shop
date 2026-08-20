import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";

function ViscosityList({ viscosities, getProductCount }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {viscosities.map((item) => {
        const count = getProductCount(item);

        return (
          <Link
            key={item}
            to={`/viscosity/${item}`}
            className="bg-white shadow-lg rounded-xl p-8 text-center hover:bg-yellow-400 transition"
          >
            <h2 className="text-3xl font-bold">{item}</h2>

            <p className="mt-3 text-gray-600">
              {count} {t("common.productsAvailable")}
            </p>

            <p className="mt-3 font-bold">
              {t("viscosity.viewGrade")} {item}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default ViscosityList;
