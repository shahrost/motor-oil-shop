import { useLocation, useNavigate } from "react-router-dom";

// برگشت به صفحه‌ی قبلِ داخل سایت (مثل Back مرورگر، تا جای اسکرول و فیلترها برگرده).
// اگه صفحه مستقیم باز شده (لینک اشتراکی، کلید "default") به لیست محصولات می‌ره
function useGoBack(fallback = "/products") {
  const navigate = useNavigate();
  const { key } = useLocation();

  return () => (key === "default" ? navigate(fallback) : navigate(-1));
}

export default useGoBack;
