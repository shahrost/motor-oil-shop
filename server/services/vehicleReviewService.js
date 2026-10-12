const mongoose = require("mongoose");

const vehicleReviewRepository = require("../repositories/vehicleReviewRepository");
const vehicleRepository = require("../repositories/vehicleRepository");
const { validateReview } = require("../validations/vehicleReviewValidation");
const AppError = require("../utils/AppError");

const STATUS_FILTERS = {
  pending: { approved: false, text: { $ne: "" } },
  approved: { approved: true, text: { $ne: "" } },
  all: {},
};

// خودرو باید وجود داشته باشه
async function findVehicle(vehicleId) {
  return vehicleRepository.findById(vehicleId);
}

// خلاصه‌ی امتیازها: میانگین (یک رقم اعشار)، تعداد و تعداد هر امتیاز
function buildSummary(groups) {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  groups.forEach((group) => {
    distribution[group._id] = group.count;
  });

  const counts = Object.entries(distribution);
  const count = counts.reduce((sum, [, n]) => sum + n, 0);
  const total = counts.reduce((sum, [rating, n]) => sum + Number(rating) * n, 0);

  return {
    count,
    average: count ? Math.round((total / count) * 10) / 10 : 0,
    distribution,
  };
}

async function getVehicleReviews(vehicleId) {
  if (!(await findVehicle(vehicleId))) throw new AppError("خودرو پیدا نشد", 404);

  const [groups, reviews] = await Promise.all([
    vehicleReviewRepository.countRatings(vehicleId),
    vehicleReviewRepository.findApprovedTexts(vehicleId),
  ]);

  return { summary: buildSummary(groups), reviews };
}

async function addReview(vehicleId, data) {
  // فیلد مخفی فرم؛ فقط ربات‌ها پرش می‌کنن
  if (data.website) throw new AppError("درخواست نامعتبر است", 400);

  if (!(await findVehicle(vehicleId))) throw new AppError("خودرو پیدا نشد", 404);

  const validation = validateReview(data);

  if (!validation.valid) throw new AppError(validation.errors.join(" - "), 400);

  const review = await vehicleReviewRepository.createReview({
    vehicleId,
    ...validation.value,
  });

  return { id: review.id, needsApproval: Boolean(review.text) };
}

// لیست ادمین (?status=pending|approved|all) با نام خودروی هر نظر
async function getReviewsForAdmin(status) {
  const filter = STATUS_FILTERS[status] || STATUS_FILTERS.pending;
  const reviews = await vehicleReviewRepository.findForAdmin(filter);
  const names = await vehicleRepository.findNamesByIds(
    reviews.map((review) => review.vehicleId),
  );

  return reviews.map((review) => ({
    ...review,
    vehicleName: names.get(review.vehicleId) || "",
  }));
}

async function approveReview(id) {
  const review = mongoose.isValidObjectId(id)
    ? await vehicleReviewRepository.approveById(id)
    : null;

  if (!review) throw new AppError("نظر پیدا نشد", 404);
}

async function deleteReview(id) {
  const review = mongoose.isValidObjectId(id)
    ? await vehicleReviewRepository.deleteById(id)
    : null;

  if (!review) throw new AppError("نظر پیدا نشد", 404);
}

module.exports = {
  getVehicleReviews,
  addReview,
  getReviewsForAdmin,
  approveReview,
  deleteReview,
};
