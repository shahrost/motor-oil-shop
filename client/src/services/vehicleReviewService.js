import apiClient from "../api/apiClient";

// امتیاز و نظرهای یک خودرو: { summary: { count, average, distribution }, reviews }

export async function fetchVehicleReviews(vehicleId) {
  const response = await apiClient.get(
    `/vehicle-reviews/vehicle/${encodeURIComponent(vehicleId)}`,
  );

  return response.data.data;
}

// ثبت امتیاز (+ نام و متن اختیاری) ← { needsApproval }

export async function submitVehicleReview(vehicleId, review) {
  const response = await apiClient.post(
    `/vehicle-reviews/vehicle/${encodeURIComponent(vehicleId)}`,
    review,
  );

  return response.data.data;
}

// ادمین: نظرها بر اساس وضعیت (pending | approved | all)

export async function fetchReviewsForAdmin(status) {
  const response = await apiClient.get("/vehicle-reviews", { params: { status } });

  return response.data.data || [];
}

export async function approveReview(id) {
  await apiClient.patch(`/vehicle-reviews/${encodeURIComponent(id)}/approve`);
}

export async function deleteReview(id) {
  await apiClient.delete(`/vehicle-reviews/${encodeURIComponent(id)}`);
}
