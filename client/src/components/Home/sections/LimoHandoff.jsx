import PersonArt from "./PersonArt";

// صحنه‌ی جلوی لیموزین دکمه‌ی Hero: اتوسرویس‌کار از دور میاد و منتظر می‌مونه، راننده از در جلو پیاده می‌شه، تا اون راه می‌ره،
// گالن روغن رو بهش می‌ده و برمی‌گرده سوار می‌شه؛ اتوسرویس‌کار هم برمی‌گرده و خلاف جهت ماشین می‌ره.
// زمان‌بندی همه در index.css (limo-*) روی یک چرخه‌ی مشترک؛ limo-scene جهت راه رفتن (--limo-dir) رو تعیین می‌کنه.
// راننده رو به جلوی ماشین (سمت پایان)، اتوسرویس‌کار بیرون از ماشین رو به راننده؛ سایه‌ی روشن تا روی زمینه‌ی تیره دیده بشن
const FIGURE = "block h-11 w-auto drop-shadow-[0_0_1px_rgba(255,255,255,0.7)]";

function LimoHandoff() {
  return (
    <span className="limo-scene" aria-hidden="true">
      <span className="limo-driver absolute bottom-0 end-[42px] z-10 block">
        <PersonArt role="driver" className={`${FIGURE} rtl:-scale-x-100`} />
      </span>
      <span className="limo-mechanic absolute bottom-0 -end-[54px] block">
        <PersonArt role="mechanic" className={`${FIGURE} ltr:-scale-x-100`} />
      </span>
    </span>
  );
}

export default LimoHandoff;
