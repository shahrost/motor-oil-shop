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

  async function reloadProducts() {
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

  async function addProduct(product) {
    try {
      const newProduct = await createProductService(product);

      setProducts((prev) => [...prev, createProduct(newProduct)]);
    } catch (error) {
      alert(error.response?.data?.message || "خطا در ثبت محصول");
    }
  }

  async function deleteProduct(id) {
    try {
      await deleteProductService(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "خطا در حذف محصول");
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
      alert(error.response?.data?.message || "خطا در ویرایش محصول");
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
    reloadProducts,
  };
}

export default useProducts;
