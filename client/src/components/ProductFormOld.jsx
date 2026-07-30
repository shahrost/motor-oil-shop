// import { useState } from "react";
// import brands from "../../data/brands";
// import categories from "../../data/productOptions/categories";
// import volumes from "../../data/productOptions/volumes";
// import viscosities from "../../data/productOptions/viscosities";
// import api from "../../data/productOptions/api";
// import acea from "../../data/productOptions/acea";

// function ProductForm({ addProduct }) {
//   const [product, setProduct] = useState({
//     brand: "",
//     category: "",
//     volume: "",
//     viscosity: "",
//     api: "",
//     acea: "",
//     oilType: "",
//     description: "",
//     price: "",
//     cartonCount: "",
//     image: "",
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;

//     let newValue = value;

//     if (name === "price" || name === "cartonCount") {
//       newValue = value.replace(/\D/g, "");
//     }

//     setProduct({
//       ...product,
//       [name]: newValue,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     const newProduct = {
//       ...product,

//       name: `${product.brand} ${product.viscosity} ${product.volume}`,

//       price: Number(product.price || 0),

//       cartonCount: Number(product.cartonCount || 0),
//     };

//     addProduct(newProduct);

//     setProduct({
//       brand: "",
//       category: "",
//       volume: "",
//       viscosity: "",
//       api: "",
//       acea: "",
//       oilType: "",
//       description: "",
//       price: "",
//       cartonCount: "",
//       image: "",
//     });
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-xl shadow-lg mt-8"
//       dir="rtl"
//     >
//       <h2 className="text-2xl font-bold mb-5">افزودن محصول جدید</h2>

//       <select
//         name="brand"
//         value={product.brand}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       >
//         <option value="">انتخاب برند</option>

//         {brands.map((item) => (
//           <option key={item.name} value={item.name}>
//             {item.name}
//           </option>
//         ))}
//       </select>

//       <select
//         name="category"
//         value={product.category}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       >
//         <option value="">انتخاب دسته بندی</option>

//        {categories.map((item) => (
// <option key={item.id} value={item.value}>
// {item.title}
// </option>
// ))}
//       </select>

//       <select
//         name="volume"
//         value={product.volume}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       >
//         <option value="">انتخاب حجم</option>

//           {volumes.map((item) => (
//           <option key={item} value={item}>
//             {item}
//           </option>
//         ))}
//       </select>

//       <select
//         name="viscosity"
//         value={product.viscosity}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       >
//         <option value="">انتخاب ویسکوزیته</option>

//         {viscosities.map((item) => (
//           <option key={item} value={item}>
//             {item}
//           </option>
//         ))}
//       </select>

//       <select
//         name="api"
//         value={product.api}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       >
//         <option value="">انتخاب API</option>

//          {api.map((item) => (
//           <option key={item} value={item}>
//             {item}
//           </option>
//         ))}
//       </select>

//       <select
//         name="acea"
//         value={product.acea}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       >
//         <option value="">انتخاب ACEA</option>

//         {acea.map((item) => (
//           <option key={item} value={item}>
//             {item}
//           </option>
//         ))}
//       </select>
//       <input
//         name="oilType"
//         placeholder="نوع روغن"
//         value={product.oilType}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       />
//       <input
//         name="price"
//         placeholder="قیمت"
//         value={product.price}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       />
//       <input
//         name="cartonCount"
//         placeholder="تعداد در کارتن"
//         value={product.cartonCount}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       />
//       <textarea
//         name="description"
//         placeholder="توضیحات"
//         value={product.description}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       />

//       <input
//         name="image"
//         placeholder="آدرس تصویر"
//         value={product.image}
//         onChange={handleChange}
//         className="border p-3 w-full rounded-lg mb-3"
//       />

//       <button
//         type="submit"
//         className="bg-green-600 text-white px-6 py-3 rounded-lg"
//       >
//         ذخیره محصول
//       </button>
//     </form>
//   );
// }

// export default ProductForm;
