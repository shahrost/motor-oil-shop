const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    id: {
      type: String,

      required: true,

      unique: true,
    },

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
        default: "",
      },

      address: {
        type: String,
        default: "",
      },
    },

    items: [
      {
        productId: {
          type: String,
          default: "",
        },

        productName: {
          type: String,
          default: "",
        },

        brand: {
          type: String,
          default: "",
        },

        viscosity: {
          type: String,
          default: "",
        },

        volume: {
          type: String,
          default: "",
        },

        orderType: {
          type: String,
          default: "",
        },

        paymentType: {
          type: String,
          default: "",
        },

        quantity: {
          type: Number,
          default: 0,
        },

        totalCount: {
          type: Number,
          default: 0,
        },

        price: {
          type: Number,
          default: 0,
        },
      },
    ],

    totalPrice: {
      type: Number,

      default: 0,
    },

    status: {
      type: String,

      default: "جدید",

      index: true,
    },

    date: {
      type: String,

      default: "",
    },
  },

  {
    timestamps: true,

    versionKey: false,
  },
);

module.exports = mongoose.model("Order", OrderSchema);
