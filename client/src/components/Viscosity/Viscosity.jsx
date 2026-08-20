import { useContext } from "react";
import useViscosity from "./hooks/useViscosity";
import ViscosityList from "./sections/ViscosityList";
import LanguageContext from "../../context/LanguageContext";

function Viscosity() {
  const { t } = useContext(LanguageContext);
  const { viscosities, getProductCount } = useViscosity();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          {t("viscosity.title")}
        </h1>

        <p className="text-center mt-3 text-gray-600">{t("viscosity.subtitle")}</p>

        <ViscosityList
          viscosities={viscosities}
          getProductCount={getProductCount}
        />
      </div>
    </div>
  );
}

export default Viscosity;
