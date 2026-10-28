import { Link } from "react-router-dom";

import useOilPour from "../hooks/useOilPour";
import OilDropArt from "./OilDropArt";
import GearTitle from "./GearTitle";
import TrackDescription from "./TrackDescription";
import OilJugArt from "./OilJugArt";
import EntryCta from "./EntryCta";

// کارت ورودی «روانکار»: قطره‌ی بزرگ، عنوان داخل چرخ‌دنده و توضیح داخل زنجیر تانک،
// با انیمیشن ریختن روغن از گالن (منطقش در useOilPour).
// روی موبایل کوتاه‌تره: قطره کوچیک گوشه‌ی راست بالا (سمت راست تا سر راه گالن که از چپ میاد نباشه)
// و چرخ‌دنده کوچیک‌تر؛ pt-12 جای گالن بالای چرخ‌دنده‌ست
function LubricantCard({ to, title, description, cta }) {
  const cardRef = useOilPour();

  return (
    <Link
      ref={cardRef}
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
        px-4
        pt-12
        pb-4
        sm:p-8
        hover:shadow-xl
        hover:border-yellow-400
        transition
      "
    >
      <div
        data-oil="drop"
        className="oil-big-drop absolute top-3 right-5 sm:static h-20 sm:h-44 flex items-center justify-center"
      >
        <OilDropArt className="h-16 sm:h-40 w-auto drop-shadow-lg" />
      </div>

      <GearTitle title={title} />

      <TrackDescription description={description} />

      <EntryCta label={cta} className="mt-3 sm:mt-5" />

      {/* لایه‌ی انیمیشن: گالن، جریان روغن و پاشش‌ها */}
      <div data-oil="layer" className="oil-layer" aria-hidden="true">
        <svg className="oil-stream">
          <defs>
            <linearGradient id="oilStreamFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffc566" />
              <stop offset=".5" stopColor="#faa61a" />
              <stop offset="1" stopColor="#d67a00" />
            </linearGradient>
          </defs>
          <path data-oil="stream" />
        </svg>

        <OilJugArt />
      </div>
    </Link>
  );
}

export default LubricantCard;
