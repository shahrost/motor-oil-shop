const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      area: {
        type: String,
      },

      address: {
        type: String,
      },
    },

    items: [
      {
        productId: Number,

        productName: String,

        brand: String,

        viscosity: String,

        volume: String,

        orderType: String,

        paymentType: String,

        quantity: Number,

        totalCount: Number,

        price: Number,
      },
    ],

    totalPrice: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "جدید",
    },

    date: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", OrderSchema);
