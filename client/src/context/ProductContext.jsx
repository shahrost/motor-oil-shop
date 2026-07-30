import { createContext, useState, useEffect } from "react";
import createProduct from "../models/createProduct";
import productsData from "../data/products";

import { getProducts, saveProducts } from "../services/productStorage";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = getProducts();

    return savedProducts ? savedProducts : productsData;
  });
  function addProduct(product) {
    const newProduct = createProduct(product);

    setProducts((prev) => [...prev, newProduct]);
  }

  function deleteProduct(id) {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  }

  function updateProduct(id, updatedProduct) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? createProduct({
              ...product,
              ...updatedProduct,
              id: product.id,
            })
          : product,
      ),
    );
  }

  function resetProducts() {
    setProducts(productsData);
  }

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,

        addProduct,

        deleteProduct,

        updateProduct,

        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
