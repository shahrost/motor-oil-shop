import { Link } from "react-router-dom";

function BrandList({ brands }) {
  return (
    <section className="px-5 mt-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center">برندهای موجود</h2>

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
  );
}

export default BrandList;
