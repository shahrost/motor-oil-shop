const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("MONGO VALUE:");
    console.log(JSON.stringify(process.env.MONGO_URI));
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("MongoDB Connection Error ❌");
    console.log(error.message);

    process.exit(1);
  }
}

module.exports = connectDB;
