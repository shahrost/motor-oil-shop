const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },

    volume: {
      type: String,
    },

    viscosity: {
      type: String,
    },

    api: {
      type: String,
    },

    acea: {
      type: String,
    },

    oilType: {
      type: String,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      default: 0,
    },

    cartonCount: {
      type: Number,
      default: 1,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      main: String,

      gallery: [String],
    },

    supplier: {
      type: String,
    },

    warranty: {
      type: String,
    },

    tags: {
      type: [String],
      default: [],
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", ProductSchema);
