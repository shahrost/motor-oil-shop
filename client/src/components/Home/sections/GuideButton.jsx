import { BookOpen } from "lucide-react";
// فایل PDF راهنما در client/public است (منبعش docs/site-guide/site-guide.html)
const GUIDE_URL = "/site-guide.pdf";

// دکمه‌ی کوچیک «راهنمای سایت» بالای کارت «خودروهای من»؛ PDF رو در تب جدید باز می‌کنه
function GuideButton({ label }) {
  return (
    <a
      href={GUIDE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        items-center
        gap-1.5
        px-3
        py-1.5
        rounded-full
        bg-yellow-400
        text-black
        text-sm
        font-bold
        shadow-sm
        hover:bg-yellow-300
        hover:shadow-md
        transition
      "
    >
      <BookOpen size={16} />
      {label}
    </a>
  );
}

export default GuideButton;
