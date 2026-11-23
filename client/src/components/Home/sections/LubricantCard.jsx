import homeOrbitOilBrands from "../../../data/homeOrbitOilBrands";
import useOilPour from "../hooks/useOilPour";
import useLogoOrbit from "../hooks/useLogoOrbit";
import { dropEllipse } from "../helpers/logoOrbit";
import OilDropArt from "./OilDropArt";
import OilJugArt from "./OilJugArt";
import EntryCard from "./EntryCard";

// کارت ورودی «روانکار»: قطره‌ی بزرگ، عنوان داخل چرخ‌دنده و توضیح داخل زنجیر تانک،
// با انیمیشن ریختن روغن از گالن (منطقش در useOilPour) و لوگوی برندهای روغن که مثل کارت
// «خودروهای من» دور قطره می‌چرخن (useLogoOrbit). روی موبایل قطره و چرخ‌دنده کوچیک‌ترن؛
// گالن بالای چرخ‌دنده روی باکس قطره میاد (لایه‌ی oil-layer روی لوگوها)

function LubricantCard({ to, title, description, cta }) {
  const cardRef = useOilPour();
  const artRef = useLogoOrbit(homeOrbitOilBrands, dropEllipse);

  return (
    <EntryCard
      cardRef={cardRef}
      to={to}
      title={title}
      description={description}
      cta={cta}
      artRef={artRef}
      art={
        <div data-entry="center" data-oil="drop" className="oil-big-drop relative z-[2] flex h-24 sm:h-40 items-center justify-center">
          <OilDropArt className="h-24 sm:h-40 w-auto drop-shadow-lg" />
        </div>
      }
    >
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
    </EntryCard>
  );
}

export default LubricantCard;
