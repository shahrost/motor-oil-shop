import { Link } from "react-router-dom";
import brands from "../../data/brands";

function Brands() {
  return (
    <div>
      <section className="px-5 mt-8">
        <h1 className="text-3xl font-extrabold text-center">
          برندهای روغن موتور
        </h1>

        <p className="text-center mt-3 text-gray-600">انتخاب برند مورد نظر</p>

        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/brand/${brand.name}`}
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-6
                text-center
                hover:shadow-xl
                hover:-translate-y-1
                transition
              "
            >
              <div className="h-24 flex items-center justify-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-20 object-contain"
                />
              </div>

              <h3 className="font-bold mt-4">{brand.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Brands;
