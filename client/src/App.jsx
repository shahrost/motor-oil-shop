import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
