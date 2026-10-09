import { Link } from "react-router-dom";
import menu from "../../../../data/menu";

function AdminNav() {
  return (
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
  );
}

export default AdminNav;
