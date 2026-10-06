import OilGrid from "./OilGrid";

// تیتر و محصولات دسته‌ی انتخاب‌شده (روغن موتور: اصلی + جایگزین)
function PartProducts({ parts, selected, isElectric, t }) {
  if (selected === "oil") {
    return (
      <>
        <h2 className="text-2xl font-extrabold text-center mt-10">
          {t("vehicles.recommendedOils")}
        </h2>

        {parts.oil.main.length > 0 ? (
          <OilGrid products={parts.oil.main} />
        ) : (
          <p
            className={`text-center mt-6 font-bold ${
              isElectric ? "text-gray-500" : "text-red-500"
            }`}
          >
            {isElectric ? t("vehicles.electricNoOil") : t("vehicles.noOils")}
          </p>
        )}

        {parts.oil.alt.length > 0 && (
          <>
            <h2 className="text-2xl font-extrabold text-center mt-10">
              {t("vehicles.alternativeOils")}
            </h2>

            <OilGrid products={parts.oil.alt} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-extrabold text-center mt-10">
        {t(`vehicles.parts.${selected}`)} {t("vehicles.parts.forVehicle")}
      </h2>

      {parts[selected].length > 0 ? (
        <OilGrid products={parts[selected]} />
      ) : (
        <p className="text-center mt-6 font-bold text-gray-500">
          {t("vehicles.parts.empty")}
        </p>
      )}
    </>
  );
}

export default PartProducts;
