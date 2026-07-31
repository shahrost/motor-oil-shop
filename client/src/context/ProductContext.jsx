import { createContext, useState, useEffect } from "react";

import createProduct from "../models/createProduct";

import {
  fetchProducts,
  createProductService,
  updateProductService,
  deleteProductService,
  removeAllProducts,
} from "../services/productService";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // دریافت محصولات

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();

        const formattedProducts = data.map((product) => createProduct(product));

        setProducts(formattedProducts);
      } catch (error) {
        console.log("خطا در دریافت محصولات", error);
      }
    }

    loadProducts();
  }, []);

  // افزودن محصول

  async function addProduct(product) {
    try {
      const newProduct = await createProductService(product);

      setProducts((prev) => [...prev, createProduct(newProduct)]);
    } catch (error) {
      console.log("خطا در ثبت محصول", error);
    }
  }

  // حذف محصول

  async function deleteProduct(id) {
    try {
      await deleteProductService(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.log("خطا در حذف محصول", error);
    }
  }

  // ویرایش محصول

  async function updateProduct(id, updatedProduct) {
    try {
      const updated = await updateProductService(id, updatedProduct);

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? createProduct(updated) : product,
        ),
      );
    } catch (error) {
      console.log("خطا در ویرایش محصول", error);
    }
  }

  // حذف همه محصولات

  async function resetProducts() {
    try {
      await removeAllProducts();

      setProducts([]);
    } catch (error) {
      console.log(error);
    }
  }

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
