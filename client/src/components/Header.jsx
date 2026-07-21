import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          روغن موتور شهرام
        </Link>

        <nav>
          <ul className="flex flex-col md:flex-row gap-5 items-center">
            <li>
              <Link to="/">خانه</Link>
            </li>

            <li>
              <Link to="/products">محصولات</Link>
            </li>

            <li>
              <Link to="/contact">تماس</Link>
            </li>

            <li>
              <a
                href="https://wa.me/989198334264"
                target="_blank"
                className="bg-green-600 px-4 py-2 rounded-lg"
              >
                واتساپ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
