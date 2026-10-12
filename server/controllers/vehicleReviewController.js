const vehicleReviewService = require("../services/vehicleReviewService");
const apiResponse = require("../utils/apiResponse");

async function getVehicleReviews(req, res, next) {
  try {
    const result = await vehicleReviewService.getVehicleReviews(req.params.vehicleId);

    return apiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
}

async function addReview(req, res, next) {
  try {
    const result = await vehicleReviewService.addReview(
      req.params.vehicleId,
      req.body || {},
    );

    return apiResponse.created(res, result, "امتیاز شما ثبت شد");
  } catch (error) {
    next(error);
  }
}

async function getReviewsForAdmin(req, res, next) {
  try {
    const reviews = await vehicleReviewService.getReviewsForAdmin(req.query.status);

    return apiResponse.success(res, reviews);
  } catch (error) {
    next(error);
  }
}

async function approveReview(req, res, next) {
  try {
    await vehicleReviewService.approveReview(req.params.id);

    return apiResponse.success(res, null, "نظر تأیید شد");
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    await vehicleReviewService.deleteReview(req.params.id);

    return apiResponse.success(res, null, "نظر حذف شد");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getVehicleReviews,
  addReview,
  getReviewsForAdmin,
  approveReview,
  deleteReview,
};
