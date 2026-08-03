require("dotenv").config();

const connectDB = require("../config/db");

const Order = require("../models/Order");

const orders = require("../data/orders.json");

async function importOrders() {
  try {
    await connectDB();

    await Order.deleteMany({});

    await Order.insertMany(orders);

    console.log("Orders imported successfully ✅");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
}

importOrders();
