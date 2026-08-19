import useViscosity from "./hooks/useViscosity";
import ViscosityList from "./sections/ViscosityList";

function Viscosity() {
  const { viscosities, getProductCount } = useViscosity();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          دسته بندی روغن موتور
        </h1>

        <p className="text-center mt-3 text-gray-600">انتخاب گرید مناسب روغن</p>

        <ViscosityList
          viscosities={viscosities}
          getProductCount={getProductCount}
        />
      </div>
    </div>
  );
}

export default Viscosity;
