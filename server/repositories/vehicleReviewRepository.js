const mongoose = require("mongoose");
const VehicleReview = require("../models/VehicleReview");

const PUBLIC_LIMIT = 50;
const ADMIN_LIMIT = 200;

function toPlain({ _id, ...rest }) {
  return { id: _id.toString(), ...rest };
}

async function createReview(data) {
  return (await VehicleReview.create(data)).toJSON();
}

// تعداد رأی هر امتیاز (۱ تا ۵) برای یک خودرو
async function countRatings(vehicleId) {
  return VehicleReview.aggregate([
    { $match: { vehicleId: new mongoose.Types.ObjectId(vehicleId) } },
    { $group: { _id: "$rating", count: { $sum: 1 } } },
  ]);
}

// نظرهای متنی تأییدشده (جدیدترین اول)، فقط فیلدهای عمومی
async function findApprovedTexts(vehicleId) {
  const docs = await VehicleReview.find(
    { vehicleId, approved: true, text: { $ne: "" } },
    { name: 1, rating: 1, text: 1, createdAt: 1 },
  )
    .sort({ createdAt: -1 })
    .limit(PUBLIC_LIMIT)
    .lean();

  return docs.map(toPlain);
}

async function findForAdmin(filter) {
  const docs = await VehicleReview.find(filter)
    .sort({ createdAt: -1 })
    .limit(ADMIN_LIMIT)
    .lean();

  return docs.map((doc) => ({
    ...toPlain(doc),
    vehicleId: doc.vehicleId.toString(),
  }));
}

async function approveById(id) {
  return VehicleReview.findByIdAndUpdate(id, { approved: true }, { returnDocument: "after" }).lean();
}

async function deleteById(id) {
  return VehicleReview.findByIdAndDelete(id).lean();
}

module.exports = {
  createReview,
  countRatings,
  findApprovedTexts,
  findForAdmin,
  approveById,
  deleteById,
};
