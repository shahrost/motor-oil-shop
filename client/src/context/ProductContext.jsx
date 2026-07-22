import { createContext, useState, useEffect } from "react";
import productsData from "../data/products";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts ? JSON.parse(savedProducts) : productsData;
  });

  function addProduct(product) {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        ...product,
        id: Date.now(),
      },
    ]);
  }
  function deleteProduct(id) {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  }
  function updateProduct(id, updatedProduct) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      ),
    );
  }
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
