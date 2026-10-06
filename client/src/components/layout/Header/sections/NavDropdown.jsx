import { Link } from "react-router-dom";

// آیتم منوی دسکتاپ با زیرمنوی هاوری؛ panelClassName چیدمان پنل رو تعیین می‌کنه
function NavDropdown({ to, label, panelClassName, children }) {
  return (
    <div className="relative group py-2">
      <Link
        to={to}
        className="
        flex
        items-center
        gap-1
        font-bold
        whitespace-nowrap
        text-gray-200
        hover:text-yellow-400
        transition
        "
      >
        {label}
        <span className="text-xs">▾</span>
      </Link>

      <div
        className={`
        absolute
        top-full
        hidden
        bg-gray-900
        border
        border-gray-800
        rounded-xl
        shadow-xl
        z-50
        ${panelClassName}
        `}
      >
        {children}
      </div>
    </div>
  );
}

export default NavDropdown;
