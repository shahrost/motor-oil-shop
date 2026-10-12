import { useCallback, useEffect, useState } from "react";

import {
  fetchVehicleReviews,
  submitVehicleReview,
} from "../../../services/vehicleReviewService";
import { saveMyVehicleRating } from "../../../services/vehicleReviewStorage";

// امتیاز و نظرهای تأییدشده‌ی یک خودرو. data: undefined تا رسیدن، null در خطا.
// submit امتیاز رو ثبت می‌کنه، توی مرورگر یادش می‌مونه و خلاصه رو دوباره می‌گیره.
function useVehicleReviews(vehicleId) {
  const [data, setData] = useState(undefined);

  const load = useCallback(async () => {
    try {
      setData(await fetchVehicleReviews(vehicleId));
    } catch {
      setData(null);
    }
  }, [vehicleId]);

  useEffect(() => {
    let cancelled = false;

    fetchVehicleReviews(vehicleId)
      .then((result) => !cancelled && setData(result))
      .catch(() => !cancelled && setData(null));

    return () => {
      cancelled = true;
    };
  }, [vehicleId]);

  async function submit(review) {
    const result = await submitVehicleReview(vehicleId, review);

    saveMyVehicleRating(vehicleId, review.rating);
    load();

    return result;
  }

  return {
    loading: data === undefined,
    summary: data?.summary || { count: 0, average: 0, distribution: {} },
    reviews: data?.reviews || [],
    submit,
  };
}

export default useVehicleReviews;
