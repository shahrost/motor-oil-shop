import { getVehicleBrandLogo } from "../../../utils/vehicleBrandLogo";

// لوگوی برند خودرو؛ تا وقتی فایل لوگو نیست، حرف اول نام برند
function VehicleBrandLogo({ nameEn, label }) {
  const logo = getVehicleBrandLogo(nameEn);

  if (logo) {
    return (
      <img
        src={logo}
        alt={label}
        loading="lazy"
        draggable={false}
        className="max-h-20 max-w-full object-contain"
      />
    );
  }

  return (
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center font-extrabold text-gray-500 text-xl">
      {label.slice(0, 1)}
    </div>
  );
}

export default VehicleBrandLogo;
