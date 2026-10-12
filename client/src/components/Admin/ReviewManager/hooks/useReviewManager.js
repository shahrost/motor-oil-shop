import { useEffect, useState } from "react";

import {
  approveReview,
  deleteReview,
  fetchReviewsForAdmin,
} from "../../../../services/vehicleReviewService";

export const REVIEW_FILTERS = [
  { key: "pending", label: "در انتظار تأیید" },
  { key: "approved", label: "تأییدشده" },
  { key: "all", label: "همه (با امتیازهای بدون متن)" },
];

// مدیریت نظرهای خودروها: فیلتر وضعیت، لیست، تأیید و حذف (حذف امتیاز رو هم از
// میانگین خودرو برمی‌داره)
function useReviewManager() {
  const [status, setStatus] = useState("pending");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchReviewsForAdmin(status)
      .then((list) => {
        if (!cancelled) setReviews(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.message || "دریافت نظرها انجام نشد");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [status, reloadKey]);

  function changeStatus(next) {
    setLoading(true);
    setError("");
    setStatus(next);
  }

  function reload() {
    setLoading(true);
    setError("");
    setReloadKey((key) => key + 1);
  }

  // update(review) ← ردیف جدید، یا null یعنی از این لیست حذف بشه
  async function run(id, action, update) {
    setBusyId(id);
    setError("");

    try {
      await action(id);
      setReviews((list) =>
        list
          .map((review) => (review.id === id ? update(review) : review))
          .filter(Boolean),
      );
    } catch (err) {
      setError(err.response?.data?.message || "انجام نشد؛ دوباره تلاش کنید");
    } finally {
      setBusyId("");
    }
  }

  return {
    status,
    setStatus: changeStatus,
    reviews,
    loading,
    error,
    busyId,
    reload,
    approve: (id) =>
      run(id, approveReview, (review) =>
        status === "pending" ? null : { ...review, approved: true },
      ),
    remove: (id) => {
      if (window.confirm("این نظر و امتیازش حذف شود؟")) run(id, deleteReview, () => null);
    },
  };
}

export default useReviewManager;
