import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 shadow-lg">

      <div className="max-w-6xl mx-auto flex justify-between items-center">


        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-yellow-400"
        >
          روغن موتور شهرام
        </Link>



        {/* Menu */}
        <nav>

          <ul className="flex items-center gap-4 md:gap-6">


            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition"
              >
                خانه
              </Link>
            </li>



            <li>
              <Link
                to="/products"
                className="hover:text-yellow-400 transition"
              >
                محصولات
              </Link>
            </li>



            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 transition"
              >
                تماس
              </Link>
            </li>



            <li>

              <a
                href="https://wa.me/989198334264"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
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