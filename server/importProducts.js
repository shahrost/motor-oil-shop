require("dotenv").config();

const connectDB = require("./config/db");

const Product = require("./models/Product");

let products = require("./data/products.json");

products = products.filter((product) => product.name && product.brand);
async function importProducts() {
  try {
    await connectDB();

    await Product.deleteMany({});

    await Product.insertMany(products);
    console.log("Products imported successfully ✅");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
}

importProducts();
