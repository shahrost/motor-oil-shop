import VehicleImage from "../VehicleImage";

// کارت عکس، نام و مشخصات خودرو
function VehicleSpecsCard({ vehicle, name, specs, t }) {
  return (
    <div className="mt-4 max-w-md mx-auto border-2 border-gray-200 rounded-xl p-4 bg-white shadow-sm">
      <VehicleImage vehicle={vehicle} name={name} className="w-full h-48" />

      <h1 className="mt-3 text-xl font-extrabold text-gray-900 text-center">
        {name}
      </h1>

      <h2 className="mt-4 mb-2 text-sm font-bold text-gray-500">
        {t("vehicles.specs")}
      </h2>

      <div className="text-sm font-bold text-gray-700 space-y-1">
        {specs.map(([label, value]) => (
          <p key={label}>
            <span className="text-gray-500">{label}</span> {value}
          </p>
        ))}
      </div>
    </div>
  );
}

export default VehicleSpecsCard;
