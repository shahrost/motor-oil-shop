const mongoose = require("mongoose");

const ProductLinkSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true },
    priority: { type: Number, default: 0 },
    kind: { type: String, default: "اصلی" },
  },
  { _id: false },
);

const VehicleSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      trim: true,
      uppercase: true,
      unique: true,
      required: true,
      index: true,
    },

    name: { type: String, required: true, trim: true },
    nameEn: { type: String, default: "", trim: true },

    brand: { type: String, required: true, trim: true, index: true },
    brandEn: { type: String, default: "", trim: true },
    country: { type: String, default: "" },

    years: { type: String, default: "" },
    yearsEn: { type: String, default: "" },

    engine: { type: String, default: "" },
    engineEn: { type: String, default: "" },
    engineSize: { type: String, default: "" },
    fuel: { type: String, default: "" },
    gearbox: { type: String, default: "" },
    body: { type: String, default: "" },
    maker: { type: String, default: "" },
    status: { type: String, default: "" },

    oilCapacity: { type: String, default: "" },
    viscosities: { type: [String], default: [] },
    altViscosities: { type: [String], default: [] },
    api: { type: String, default: "" },
    interval: { type: String, default: "" },

    // روغن‌های پیشنهادی مشخص برای این خودرو (به ترتیب اولویت)
    productLinks: { type: [ProductLinkSchema], default: [] },

    image: { type: String, default: "" },
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

module.exports = mongoose.model("Vehicle", VehicleSchema);
