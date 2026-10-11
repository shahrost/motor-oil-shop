import { useState } from "react";

// لوگوی نشان برند؛ اگه فایل لوگو نبود یا لود نشد، نشان حرف اول نام برند رو نشون می‌ده
// (عکس شکسته هیچ‌وقت دیده نمی‌شه). خطا برای همون آدرس نگه داشته می‌شه، پس با عوض شدن
// آدرس لوگو دوباره امتحان می‌شه.
function useBrandBadge(src) {
  const [failedSrc, setFailedSrc] = useState("");

  return {
    showLogo: Boolean(src) && failedSrc !== src,
    onError: () => setFailedSrc(src),
  };
}

export default useBrandBadge;
