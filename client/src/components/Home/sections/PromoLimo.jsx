import { Link } from "react-router-dom";
import { Gift } from "lucide-react";

import LimoHandoff from "./LimoHandoff";

// دکمه‌ی «طرح فروش و سبد کالا» Hero به شکل لیموزین مشکی براق رو به جلو (سمت پایان): بدنه‌ی کشیده و کوتاه،
// سقف کوتاه با شیشه‌های دودی، کاپوت بلند، نوار کرومی؛ اگزوز و دود سمت شروع.
// راننده پیاده می‌شه و گالن روغن به اتوسرویس‌کار می‌ده (LimoHandoff)؛ چرخ‌ها تا راننده بیرونه می‌ایستن. انیمیشن‌ها در index.css.
// ms-7 جا برای دود و me-14 جا برای اتوسرویس‌کار باز می‌کنه (جمعاً ~۳۱۸px، در گوشی ۳۶۰ جا می‌شه)
const REAR_WINDOWS = 3;
const WHEELS = ["start-4", "end-5"];

function PromoLimo({ label }) {
  return (
    <Link
      to="/promotions"
      className="group relative mt-6 ms-7 me-14 inline-block pt-4 pb-3 transition-transform hover:-translate-x-1 ltr:hover:translate-x-1"
    >
      <span className="car-idle relative block">
        {/* سقف کوتاه: شیشه‌های دودی عقب + شیشه‌ی روشن راننده با سرش (وقتی پیاده‌ست دیده نمی‌شه) */}
        <span
          className="absolute -top-[13px] start-[12%] end-[18%] h-[14px] flex gap-[3px] px-2 pt-[3px] rounded-ss-[10px] rounded-se-[16px] bg-gray-800 group-hover:bg-gray-700 ring-1 ring-white/25 transition-colors"
          aria-hidden="true"
        >
          {Array.from({ length: REAR_WINDOWS }, (_, i) => (
            <span key={i} className="flex-1 rounded-t-[3px] bg-gray-950/90" />
          ))}
          <span className="relative flex-1 overflow-hidden rounded-t-[3px] rounded-se-[10px] bg-sky-200/70">
            <span className="limo-seat absolute -bottom-0.5 inset-x-0 mx-auto w-2 h-2.5 rounded-t-full bg-gray-950" />
          </span>
        </span>

        {/* بدنه: چراغ عقب قرمز سمت شروع، چراغ جلو سمت پایان، نوار کرومی، در راننده زیر شیشه‌ی جلو */}
        <span className="relative flex items-center gap-2 h-9 ps-4 pe-[72px] rounded-s-md rounded-e-[1.1rem] bg-gray-800 group-hover:bg-gray-700 ring-1 ring-white/25 text-yellow-400 text-sm font-bold shadow-lg shadow-yellow-400/25 transition-colors">
          <span className="absolute inset-x-2 bottom-2 h-px bg-gray-300/70" aria-hidden="true" />
          <span className="absolute start-0 top-2 w-1.5 h-2.5 rounded-e bg-red-500" aria-hidden="true" />
          <span className="absolute end-1 top-2 w-2 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" aria-hidden="true" />

          {/* در راننده: پشتش داخل روشن ماشین، خود در از لبه‌ی جلو باز و بسته می‌شه */}
          <span className="absolute end-[46px] top-0.5 bottom-1 w-5 rounded-sm bg-amber-200/80" aria-hidden="true" />
          <span
            className="limo-door absolute end-[46px] top-0.5 bottom-1 w-5 rounded-sm border border-white/25 bg-gray-800 group-hover:bg-gray-700 transition-colors origin-right rtl:origin-left"
            aria-hidden="true"
          >
            <span className="absolute top-1/3 start-1 w-1.5 h-0.5 rounded bg-gray-300/80" />
          </span>

          <Gift size={17} className="relative" />
          <span className="relative">{label}</span>
        </span>
      </span>

      {/* چرخ‌ها با قالپاق کرومی */}
      {WHEELS.map((pos) => (
        <span
          key={pos}
          className={`absolute bottom-0 ${pos} w-[22px] h-[22px] rounded-full bg-gray-900 ring-[3px] ring-gray-950 flex items-center justify-center`}
          aria-hidden="true"
        >
          <span className="limo-wheel w-3 h-3 rounded-full border-2 border-dashed border-gray-300" />
        </span>
      ))}

      {/* اگزوز و دود */}
      <span className="absolute -start-1.5 bottom-4 w-2 h-1.5 rounded-sm bg-gray-400" aria-hidden="true" />
      <span className="car-smoke absolute -start-4 bottom-3.5 w-3 h-3 rounded-full bg-gray-200/90" aria-hidden="true" />
      <span
        className="car-smoke absolute -start-7 bottom-5 w-4 h-4 rounded-full bg-gray-200/70"
        style={{ animationDelay: "-0.6s" }}
        aria-hidden="true"
      />
      <span
        className="car-smoke absolute -start-11 bottom-7 w-5 h-5 rounded-full bg-gray-200/50"
        style={{ animationDelay: "-1.2s" }}
        aria-hidden="true"
      />

      <LimoHandoff />
    </Link>
  );
}

export default PromoLimo;
