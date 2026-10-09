import { Link } from "react-router-dom";

import useLogoOrbit from "../hooks/useLogoOrbit";
import CarArt from "./CarArt";

// کارت ورودی «خودروهای من»: ماشین ثابت وسط و لوگوی برندها دورش می‌چرخن
// (منطقش در useLogoOrbit)
function VehiclesCard({ to, title, description }) {
  const artRef = useLogoOrbit();

  return (
    <Link
      to={to}
      className="
        group
        relative
        overflow-hidden
        flex
        flex-col
        items-center
        text-center
        bg-white
        rounded-3xl
        shadow-md
        border-2
        border-transparent
        p-8
        hover:shadow-xl
        hover:border-yellow-400
        transition
      "
    >
      <div ref={artRef} className="relative w-full h-44 flex items-center justify-center">
        <div className="relative z-[2]">
          <CarArt />
        </div>
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-gray-900">{title}</h2>

      <p className="mt-2 text-gray-600">{description}</p>
    </Link>
  );
}

export default VehiclesCard;
