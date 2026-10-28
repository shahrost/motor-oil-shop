import { Link } from "react-router-dom";

import useLogoOrbit from "../hooks/useLogoOrbit";
import CarArt from "./CarArt";
import EntryCta from "./EntryCta";

// کارت ورودی «خودروهای من»: ماشین ثابت وسط و لوگوی برندها دورش می‌چرخن
// (منطقش در useLogoOrbit). روی موبایل افقیه (تصویر یک طرف، متن و دکمه طرف دیگه)
// تا ارتفاعش نصف بشه؛ از sm مثل قبل عمودی. توضیح کوتاه فقط موبایل، کامل از sm
function VehiclesCard({ to, title, description, shortDescription, cta }) {
  const artRef = useLogoOrbit();

  return (
    <Link
      to={to}
      className="
        group
        relative
        overflow-hidden
        flex
        sm:flex-col
        items-center
        gap-2
        sm:gap-0
        text-start
        sm:text-center
        bg-white
        rounded-3xl
        shadow-md
        border-2
        border-transparent
        p-4
        sm:p-8
        hover:shadow-xl
        hover:border-yellow-400
        transition
      "
    >
      {/* @container: اندازه‌ی ماشین (CarArt) از عرض همین باکس */}
      <div
        ref={artRef}
        className="@container relative shrink-0 w-[52%] sm:w-full h-40 sm:h-44 flex items-center justify-center"
      >
        <div className="relative z-[2]">
          <CarArt />
        </div>
      </div>

      <div className="min-w-0 flex-1 sm:flex-none flex flex-col items-start sm:items-center">
        <h2 className="sm:mt-6 text-lg sm:text-2xl font-extrabold text-gray-900 whitespace-nowrap">{title}</h2>

        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
          <span className="sm:hidden">{shortDescription}</span>
          <span className="hidden sm:inline">{description}</span>
        </p>

        <EntryCta label={cta} className="mt-3 sm:mt-5" />
      </div>
    </Link>
  );
}

export default VehiclesCard;
