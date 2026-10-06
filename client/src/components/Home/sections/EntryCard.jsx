import { Link } from "react-router-dom";

// کارت ورودی صفحه‌ی اصلی: تصویر بزرگ + عنوان و توضیح
function EntryCard({ to, title, description, art }) {
  return (
    <Link
      to={to}
      className="
        group
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
        hover:-translate-y-1
        transition
      "
    >
      <div className="h-44 flex items-center justify-center group-hover:scale-105 transition">
        {art}
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-gray-900">{title}</h2>

      <p className="mt-2 text-gray-600">{description}</p>
    </Link>
  );
}

export default EntryCard;
