import { Link } from "react-router-dom";
import useAdminHeader from "./hooks/useAdminHeader";
import menu from "../../../data/menu";
import brandLogo from "../../../assets/logo/shahram-monogram-black.svg";

function AdminHeader() {
  const { logout } = useAdminHeader();

  return (
    <header
      className="
      bg-white
      shadow
      rounded-xl
      p-5
      mb-5
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        flex-wrap
        gap-3
        "
      >
        <div className="flex items-center gap-3">
          <img
            src={brandLogo}
            alt=""
            className="h-7 w-auto select-none"
            draggable="false"
          />

          <h1
            className="
            text-2xl
            font-bold
            "
          >
            پنل مدیریت محصولات
          </h1>
        </div>

        <button
          onClick={logout}
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

      <nav
        className="
        flex
        flex-wrap
        gap-3
        mt-4
        pt-4
        border-t
        "
      >
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="
            bg-gray-100
            hover:bg-yellow-400
            text-gray-800
            font-bold
            px-4
            py-2
            rounded-lg
            transition
            "
          >
            {item.titleFa}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default AdminHeader;
