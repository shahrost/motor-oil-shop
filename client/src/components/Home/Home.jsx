import { useContext } from "react";

import ProductCard from "../ProductCard";
import { ProductContext } from "../../context";
import LanguageContext from "../../context/LanguageContext";

import brands from "../../data/brands";
import features from "../../data/features";

import HomeSearch from "./sections/HomeSearch";
import QuickFilter from "./sections/QuickFilter";
import BrandList from "./sections/BrandList";
import FeaturedProducts from "./sections/FeaturedProducts";
import Features from "./sections/Features";
import SalesBanner from "./sections/SalesBanner";
import FloatingActions from "./sections/FloatingActions";

function Home() {
  const { products } = useContext(ProductContext);
  const { t } = useContext(LanguageContext);

  return (
    <div>
      <HomeSearch />

      <QuickFilter />

      <section className="px-5 mt-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-black">
            {t("home.productsTitle")}
          </h2>

          <p className="text-center text-gray-600 mt-3">
            {t("home.productsSubtitle")}
          </p>
        </div>
      </section>

      <BrandList brands={brands} />

      <FeaturedProducts products={products} ProductCard={ProductCard} />

      <SalesBanner />

      <Features features={features} />

      <FloatingActions />
    </div>
  );
}

export default Home;
