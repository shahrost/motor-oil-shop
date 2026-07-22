import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Viscosity from "./pages/Viscosity";
import ViscosityProducts from "./pages/ViscosityProducts";
import Brands from "./pages/Brands";
import BrandProducts from "./pages/BrandProducts";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/viscosity" element={<Viscosity />} />
        <Route path="/viscosity/:viscosity" element={<ViscosityProducts />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand/:brand" element={<BrandProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
