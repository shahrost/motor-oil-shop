import { Link } from "react-router-dom";

function AdminActions({ onLogout }) {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/admin/orders"
        className="
        bg-yellow-400
        text-black
        px-5
        py-2
        rounded-lg
        font-bold
        hover:bg-yellow-500
        "
      >
        سفارشات
      </Link>

      <button
        onClick={onLogout}
        className="
        bg-red-600
        text-white
        px-5
        py-2
        rounded-lg
        hover:bg-red-700
        "
      >
        خروج از پنل
      </button>
    </div>
  );
}

export default AdminActions;
