import { useEffect, useState } from "react";

import createProduct from "../../../models/createProduct";

import {
  fetchProducts,
  createProductService,
  updateProductService,
  deleteProductService,
  removeAllProducts,
} from "../../../services/productService";

function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetchProducts();

        const productsData = response.data || [];

        const formattedProducts = productsData.map((product) =>
          createProduct(product),
        );

        setProducts(formattedProducts);
      } catch (error) {
        console.log("خطا در دریافت محصولات", error);
      }
    }

    loadProducts();
  }, []);

  async function addProduct(product) {
    try {
      const newProduct = await createProductService(product);

      setProducts((prev) => [...prev, createProduct(newProduct)]);
    } catch (error) {
      console.log("خطا در ثبت محصول", error);
    }
  }

  async function deleteProduct(id) {
    try {
      await deleteProductService(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.log("خطا در حذف محصول", error);
    }
  }

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

  async function resetProducts() {
    try {
      await removeAllProducts();

      setProducts([]);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
    resetProducts,
  };
}

export default useProducts;
