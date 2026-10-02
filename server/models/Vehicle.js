const mongoose = require("mongoose");

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

    years: { type: String, default: "" },
    yearsEn: { type: String, default: "" },

    engine: { type: String, default: "" },
    engineEn: { type: String, default: "" },

    oilCapacity: { type: String, default: "" },
    viscosities: { type: [String], default: [] },
    api: { type: String, default: "" },
    interval: { type: String, default: "" },

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
