import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import useVehicleBrands from "./hooks/useVehicleBrands";
import useVehicleSearch from "./hooks/useVehicleSearch";
import { VehicleBrandCard, VehicleSearchBox, VehicleSearchResults } from "./sections";

// صفحه‌ی «خودروهای من» (مقصد مشترک کارت صفحه‌ی اصلی و منوی هدر): برندها + جستجوی
// خودرو در همه‌ی برندها (با عبارت جستجو، نتیجه‌ها جای برندها نشون داده می‌شن)
function Vehicles() {
  const { t } = useContext(LanguageContext);
  usePageMeta(t("vehicles.title"), t("meta.vehicles"));
  const brands = useVehicleBrands();
  const search = useVehicleSearch(brands);

  return (
    <section className="px-5 mt-8">
      <h1 className="text-3xl font-extrabold text-center">
        {t("vehicles.title")}
      </h1>

      <p className="text-center mt-3 text-gray-600">{t("vehicles.subtitle")}</p>

      <VehicleSearchBox
        value={search.search}
        onChange={search.setSearch}
        onFocus={search.prepare}
      />

      {search.active ? (
        <VehicleSearchResults
          loading={search.loading}
          failed={search.failed}
          matchedBrands={search.matchedBrands}
          vehicles={search.vehicles}
          total={search.total}
          onShowMore={search.showMore}
        />
      ) : brands === null ? (
        <p className="text-center text-gray-500 mt-10">{t("vehicles.loading")}</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {brands.map((brand) => (
            <VehicleBrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Vehicles;
