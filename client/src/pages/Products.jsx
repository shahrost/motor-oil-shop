import { useContext, useMemo, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductContext from "../context/ProductContext";
import { getBrands, getViscosities, getVolumes } from "../utils/productFilters";
function Products() {
  const { products } = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("همه");
  const [viscosity, setViscosity] = useState("همه");
  const [volume, setVolume] = useState("همه");
  const [sort, setSort] = useState("default");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 500) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const brands = getBrands(products);

  const viscosities = getViscosities(products);

  const volumes = getVolumes(products);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((product) =>
        `${product.name} ${product.brand} ${product.viscosity} ${product.volume}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    if (brand !== "همه") {
      result = result.filter((product) => product.brand === brand);
    }

    if (viscosity !== "همه") {
      result = result.filter((product) => product.viscosity === viscosity);
    }

    if (volume !== "همه") {
      result = result.filter((product) => product.volume === volume);
    }

    // if (onlyAvailable) {
    //   result = result.filter((product) => product.stock !== 0);
    // }

    if (sort === "cheap") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "expensive") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sort === "new") {
      result.sort((a, b) => Number(b.id) - Number(a.id));
    }

    if (sort === "best") {
      result.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    }

    return result;
  }, [products, search, brand, viscosity, volume, sort, onlyAvailable]);

  function clearFilters() {
    setSearch("");
    setBrand("همه");
    setViscosity("همه");
    setVolume("همه");
    setSort("default");
    setOnlyAvailable(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5 md:p-10" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* فیلترها */}

        <section className="bg-white rounded-3xl shadow-md p-5 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold">فیلتر محصولات</h2>

            <button
              onClick={clearFilters}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold"
            >
              پاک کردن
            </button>
          </div>

          <input
            type="text"
            placeholder="🔍 جستجوی محصول، برند، گرید..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl p-4 text-black mb-5"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border rounded-2xl p-3 bg-white text-black"
            >
              {brands.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={viscosity}
              onChange={(e) => setViscosity(e.target.value)}
              className="border rounded-2xl p-3 bg-white text-black"
            >
              {viscosities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="border rounded-2xl p-3 bg-white text-black"
            >
              {volumes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-2xl p-3 bg-white text-black"
            >
              <option value="default">مرتب سازی</option>

              <option value="cheap">ارزان‌ترین</option>

              <option value="expensive">گران‌ترین</option>

              <option value="new">جدیدترین</option>

              <option value="best">پرفروش‌ترین</option>
            </select>
          </div>

          <label className="flex items-center gap-3 mt-5 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-5 h-5"
            />

            <span className="font-bold">فقط محصولات موجود</span>
          </label>
        </section>

        {/* محصولات */}

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow">
            <p className="text-xl font-bold text-gray-700">محصولی پیدا نشد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="animate-[fadeIn_0.4s_ease]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {showTop && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 left-6 bg-black text-white w-12 h-12 rounded-full shadow-xl text-xl"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Products;
