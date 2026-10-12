import { useState } from "react";

import { getMyVehicleRating } from "../../../services/vehicleReviewStorage";

export const TEXT_MAX = 600;

// فرم امتیاز/نظر: ستاره‌ی انتخاب‌شده و زیر نشانگر، نام و متن اختیاری، فیلد مخفی
// ضد ربات (website) و وضعیت ارسال. اگه این مرورگر قبلاً امتیاز داده، فرم نشون داده نمی‌شه.
function useReviewForm(vehicleId, submit) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const myRating = result ? rating : getMyVehicleRating(vehicleId);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!rating || sending) return;

    setSending(true);
    setError("");

    try {
      setResult(await submit({ rating, name, text, website }));
    } catch (err) {
      setError(err.response?.data?.message || "network");
    } finally {
      setSending(false);
    }
  }

  return {
    rating,
    shown: hover || rating,
    setRating,
    setHover,
    name,
    setName,
    text,
    setText: (value) => setText(value.slice(0, TEXT_MAX)),
    website,
    setWebsite,
    sending,
    error,
    myRating,
    justSent: Boolean(result),
    needsApproval: Boolean(result?.needsApproval),
    handleSubmit,
  };
}

export default useReviewForm;
