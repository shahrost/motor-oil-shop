const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,

    versionKey: false,

    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.passwordHash;
      },
    },
  },
);

module.exports = mongoose.model("Customer", CustomerSchema);
