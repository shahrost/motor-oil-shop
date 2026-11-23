import { Link } from "react-router-dom";

import GearTitle from "./GearTitle";
import TrackDescription from "./TrackDescription";
import EntryCta from "./EntryCta";

// هر دو ورودی از یک قالب استفاده می‌کنند تا اندازه و محل تمام ردیف‌ها یکسان بماند.
function EntryCard({ to, title, description, cta, cardRef, artRef, art, titleArt, descriptionArt, children }) {
  return (
    <Link
      ref={cardRef}
      to={to}
      className="group relative overflow-hidden flex flex-col items-center text-center bg-white rounded-3xl shadow-md border-2 border-transparent p-4 sm:p-8 hover:shadow-xl hover:border-yellow-400 transition"
    >
      <div
        ref={artRef}
        data-entry="orbit"
        className="@container relative shrink-0 w-full h-36 sm:h-44 flex items-center justify-center"
      >
        {art}
      </div>
      {titleArt ?? <GearTitle title={title} />}
      {descriptionArt ?? <TrackDescription description={description} />}
      <EntryCta label={cta} />
      {children}
    </Link>
  );
}

export default EntryCard;
