const mongoose = require("mongoose");

const RETRY_DELAY_MS = 5000;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("MongoDB Connection Error ❌");
    console.log(error.message);
    console.log(`Retrying in ${RETRY_DELAY_MS / 1000}s...`);

    setTimeout(connectDB, RETRY_DELAY_MS);
  }
}

module.exports = connectDB;
