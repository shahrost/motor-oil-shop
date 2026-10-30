const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    id: {
      type: String,

      required: true,

      unique: true,
    },

    customerId: {
      type: String,

      default: "",

      index: true,
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

      // موقعیت انتخابی روی نقشه (اختیاری)
      location: {
        lat: Number,
        lng: Number,
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

        // مشخصات فنی محصول در لحظه‌ی سفارش (برای اینکه ادمین بدونه دقیقاً چه روغنی سفارش داده شده)
        sku: {
          type: String,
          default: "",
        },

        category: {
          type: String,
          default: "",
        },

        api: {
          type: String,
          default: "",
        },

        acea: {
          type: String,
          default: "",
        },

        oilType: {
          type: String,
          default: "",
        },

        // خودرویی که مشتری از صفحه‌اش محصول رو انتخاب کرده (اختیاری؛ سفارش‌های قدیمی ندارن)
        vehicle: {
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

        giftQty: {
          type: Number,
          default: 0,
        },

        // تیک «ناموجود» ادمین: قلمی که مشتری خواسته ولی در انبار نیست (از فاکتور PDF کنار می‌ره)
        unavailable: {
          type: Boolean,
          default: false,
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

    // تیک «انجام شد» ادمین: سفارش رسیدگی شده، جدا از وضعیت ارسال
    done: {
      type: Boolean,

      default: false,
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
