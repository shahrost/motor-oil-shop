const {
  getAllProducts,
  saveProducts,
} = require("../repositories/productRepository");

// خواندن محصولات از فایل JSON

// ذخیره محصولات داخل JSON

// دریافت همه محصولات
function getProducts(req, res) {
  const products = getAllProducts();

  res.json(products);
}

// ساخت محصول جدید
function createProduct(req, res) {
  const products = getAllProducts();

  const newProduct = {
    id: Date.now(),

    ...req.body,
  };

  products.push(newProduct);

  saveProducts(products);

  res.status(201).json(newProduct);
}

// ویرایش محصول
function updateProduct(req, res) {
  const products = getAllProducts();

  const id = Number(req.params.id);

  const updatedProducts = products.map((product) => {
    if (product.id === id) {
      return {
        ...product,
        ...req.body,
      };
    }

    return product;
  });

  saveProducts(updatedProducts);

  const updatedProduct = updatedProducts.find((product) => product.id === id);

  res.json(updatedProduct);
}

// حذف یک محصول
function deleteProduct(req, res) {
  const products = getAllProducts();

  const id = Number(req.params.id);

  const filteredProducts = products.filter((product) => product.id !== id);

  saveProducts(filteredProducts);

  res.json({
    message: "Product deleted",
  });
}

// حذف همه محصولات
function deleteAllProducts(req, res) {
  saveProducts([]);

  res.json({
    message: "All products deleted",
  });
}

module.exports = {
  getProducts,

  createProduct,

  updateProduct,

  deleteProduct,

  deleteAllProducts,
};
