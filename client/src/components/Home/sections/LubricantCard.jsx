import { Link } from "react-router-dom";

import useOilPour from "../hooks/useOilPour";
import OilDropArt from "./OilDropArt";
import GearTitle from "./GearTitle";
import TrackDescription from "./TrackDescription";
import OilJugArt from "./OilJugArt";

// کارت ورودی «روانکار»: قطره‌ی بزرگ، عنوان داخل چرخ‌دنده و توضیح داخل زنجیر تانک،
// با انیمیشن ریختن روغن از گالن (منطقش در useOilPour)
function LubricantCard({ to, title, description }) {
  const cardRef = useOilPour();

  return (
    <Link
      ref={cardRef}
      to={to}
      className="
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
      <div data-oil="drop" className="oil-big-drop h-44 flex items-center justify-center">
        <OilDropArt />
      </div>

      <GearTitle title={title} />

      <TrackDescription description={description} />

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
