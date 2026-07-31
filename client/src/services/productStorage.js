// import apiClient from "../api/apiClient";

// const STORAGE_KEY = "products";

// // دریافت محصولات

// export async function getProducts() {
//   try {
//     const response = await apiClient.get("/products");

//     return response.data;
//   } catch (error) {
//     console.log("API unavailable, loading local products");

//     const saved = localStorage.getItem(STORAGE_KEY);

//     return saved ? JSON.parse(saved) : [];
//   }
// }

// // ذخیره محصولات

// export async function saveProducts(products) {
//   try {
//     await apiClient.post("/products", products);
//   } catch (error) {
//     localStorage.setItem(
//       STORAGE_KEY,

//       JSON.stringify(products),
//     );
//   }
// }

// // حذف همه محصولات

// export async function clearProducts() {
//   try {
//     await apiClient.delete("/products");
//   } catch (error) {
//     localStorage.removeItem(STORAGE_KEY);
//   }
// }
