const mongoose = require("mongoose");
const onAnyWrite = require("./plugins/onAnyWrite");
const productListCache = require("../utils/productListCache");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      trim: true,
      uppercase: true,
      unique: true,
      sparse: true,
      index: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      default: "",
      index: true,
    },

    volume: {
      type: String,
      default: "",
    },

    viscosity: {
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

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    priceCheck: {
      type: Number,
      default: 0,
    },

    discountPercent: {
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
      main: {
        type: String,
        default: "",
      },

      gallery: {
        type: [String],
        default: [],
      },
    },

    supplier: {
      type: String,
      default: "",
    },

    warranty: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    slug: {
      type: String,
      default: "",
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    promotion: {
      isActive: {
        type: Boolean,
        default: false,
      },

      // buyQty: پله‌ی مشترک (طرح‌های قدیمی). اگر buyQtyCash/buyQtyCheck
      // مقدار داشته باشند، برای همان نوع پرداخت جایگزین buyQty می‌شوند.
      buyQty: {
        type: Number,
        default: 0,
      },

      buyQtyCash: {
        type: Number,
        default: 0,
      },

      buyQtyCheck: {
        type: Number,
        default: 0,
      },

      // حداقل تعداد کارتن سفارش برای تعلق هدیه (۰ یعنی بدون حداقل)
      minQty: {
        type: Number,
        default: 0,
      },

      giftQtyCash: {
        type: Number,
        default: 0,
      },

      giftQtyCheck: {
        type: Number,
        default: 0,
      },

      note: {
        type: String,
        default: "",
      },
    },
  },

  {
    timestamps: true,

    versionKey: false,

    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();

        delete ret._id;
      },
    },
  },
);

// هر تغییری روی محصولات (ادمین، ایمپورت اکسل، سفارش و ...) کش لیست محصولات رو باطل می‌کنه
ProductSchema.plugin(onAnyWrite, { handler: productListCache.invalidate });

module.exports = mongoose.model("Product", ProductSchema);
