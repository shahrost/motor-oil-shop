import { Link } from "react-router-dom";
import { useContext } from "react";

import ProductCard from "../components/ProductCard";
import ProductContext from "../context/ProductContext";
import  brands  from "../data/brands";
import  features  from "../data/features";

function Home() {
  const { products } = useContext(ProductContext);

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* سرچ */}

      <section className="px-5 mt-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow p-4">
          <input
            type="text"
            placeholder="🔍 جستجوی سریع محصول، برند یا گرید..."
            className="
            w-full
            border
            border-gray-300
            rounded-2xl
            p-4
            text-black
            outline-none
            focus:ring-2
            focus:ring-yellow-400
            "
          />
        </div>
      </section>

      {/* عنوان محصولات */}

      <section className="px-5 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="
          text-3xl
          font-extrabold
          text-center
          text-black
          "
          >
            محصولات روغن موتور
          </h2>

          <p
            className="
          text-center
          text-gray-600
          mt-3
          "
          >
            جدیدترین محصولات فروشگاه شهرام روغن
          </p>
        </div>
      </section>

      {/* برندها */}

      <section className="px-5 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="
          text-3xl
          font-extrabold
          text-center
          "
          >
            برندهای موجود
          </h2>

          <div
            className="
            flex
            gap-4
            overflow-x-auto
            mt-8
            pb-4
            scrollbar-hide
            "
          >
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/brand/${brand.name}`}
                className="
                min-w-35
                bg-white
                rounded-3xl
                shadow-md
                p-5
                hover:shadow-xl
                hover:-translate-y-1
                transition
                "
              >
                <div
                  className="
                  h-20
                  flex
                  items-center
                  justify-center
                  "
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="
                    max-h-16
                    object-contain
                    "
                  />
                </div>

                <h3
                  className="
                  font-bold
                  text-center
                  mt-4
                  text-sm
                  "
                >
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* محصولات */}

      <section className="px-5 mt-14">
        <div className="max-w-7xl mx-auto">
          <div
            className="
          flex
          items-center
          justify-between
          mb-8
          "
          >
            <h2
              className="
            text-3xl
            font-extrabold
            "
            >
              محصولات
            </h2>

            <Link
              to="/products"
              className="
              text-green-700
              font-bold
              "
            >
              مشاهده همه
            </Link>
          </div>

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-6
            "
          >
            {products.slice(0, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* طرح های فروش */}

    

      {/* ویژگی ها */}

      {/* ویژگی ها */}

      <section className="px-5 mt-14">
        <div className="max-w-7xl mx-auto">
          <div
            className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-6
      "
          >
            {features.map((item) => (
              <div
                key={item.title}
                className="
          bg-white
          rounded-3xl
          shadow
          p-6
          text-center
          "
              >
                <div className="text-4xl">{item.icon}</div>

                <h3
                  className="
            font-bold
            text-lg
            mt-4
            "
                >
                  {item.title}
                </h3>

                <p
                  className="
            text-gray-600
            text-sm
            mt-3
            "
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* بنر همکاری */}

     

      {/* دکمه شناور واتساپ */}

      <a
        href="https://wa.me/989198334264"
        target="_blank"
        rel="noreferrer"
        className="
        fixed
        bottom-6
        right-6
        bg-green-600
        text-white
        w-14
        h-14
        rounded-full
        flex
        items-center
        justify-center
        text-2xl
        shadow-xl
        z-50
        "
      >
        💬
      </a>

      {/* دکمه تماس */}

      <a
        href="tel:09198334264"
        className="
        fixed
        bottom-6
        left-6
        bg-blue-600
        text-white
        w-14
        h-14
        rounded-full
        flex
        items-center
        justify-center
        text-2xl
        shadow-xl
        z-50
        "
      >
        📞
      </a>
    </div>
  );
}

export default Home;
