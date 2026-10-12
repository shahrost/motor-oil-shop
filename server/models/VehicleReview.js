const mongoose = require("mongoose");

// امتیاز و نظر کاربران درباره‌ی یک خودرو. امتیاز همیشه در میانگین حساب می‌شه؛
// متن نظر فقط بعد از تأیید ادمین (approved) روی سایت نمایش داده می‌شه.
const VehicleReviewSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    name: { type: String, default: "", trim: true, maxlength: 40 },
    text: { type: String, default: "", trim: true, maxlength: 600 },
    approved: { type: Boolean, default: false, index: true },
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

module.exports = mongoose.model("VehicleReview", VehicleReviewSchema);
