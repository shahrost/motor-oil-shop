import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductContext } from "../../../context";
import LanguageContext from "../../../context/LanguageContext";
import {
  getBrands,
  getViscosities,
  getVolumes,
  getPriceOptions,
} from "../../../utils/productFilters";
import priceRanges from "../../../data/productOptions/priceRanges";

function useProducts() {
  const { products } = useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState(searchParams.get("brand") || "همه");
  const [viscosity, setViscosity] = useState(
    searchParams.get("viscosity") || "همه",
  );
  const [volume, setVolume] = useState(searchParams.get("volume") || "همه");
  const [priceRange, setPriceRange] = useState(
    searchParams.get("priceRange") || "همه",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "default");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const brands = getBrands(language);
  const viscosities = getViscosities(language);
  const volumes = getVolumes(language);
  const priceOptions = getPriceOptions(language);

  const priceOption =
    sort === "cheap"
      ? "sort:cheap"
      : sort === "expensive"
        ? "sort:expensive"
        : priceRange !== "همه"
          ? `range:${priceRange}`
          : "";

  function setPriceOption(value) {
    if (value.startsWith("sort:")) {
      setSort(value.replace("sort:", ""));
      setPriceRange("همه");
    } else if (value.startsWith("range:")) {
      setPriceRange(value.replace("range:", ""));
      setSort("default");
    } else {
      setSort("default");
      setPriceRange("همه");
    }
  }

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

    if (priceRange !== "همه") {
      const range = priceRanges.find((item) => item.id === priceRange);

      if (range) {
        result = result.filter(
          (product) =>
            Number(product.price) >= range.min &&
            Number(product.price) <= range.max,
        );
      }
    }

    if (onlyAvailable) {
      result = result.filter((product) => product.stock !== 0);
    }

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
  }, [
    products,
    search,
    brand,
    viscosity,
    volume,
    priceRange,
    sort,
    onlyAvailable,
  ]);

  function clearFilters() {
    setSearch("");
    setBrand("همه");
    setViscosity("همه");
    setVolume("همه");
    setPriceRange("همه");
    setSort("default");
    setOnlyAvailable(false);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return {
    products,
    search,
    setSearch,
    brand,
    setBrand,
    viscosity,
    setViscosity,
    volume,
    setVolume,
    priceOption,
    setPriceOption,
    onlyAvailable,
    setOnlyAvailable,
    showTop,
    brands,
    viscosities,
    volumes,
    priceOptions,
    filteredProducts,
    clearFilters,
    scrollToTop,
  };
}

export default useProducts;
