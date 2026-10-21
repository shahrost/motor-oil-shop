import useScrollRestoration from "./hooks/useScrollRestoration";

// مدیریت اسکرول بین صفحه‌ها (بالای صفحه با لینک، جای قبلی با Back)؛ منطق در hook
function ScrollRestoration() {
  useScrollRestoration();

  return null;
}

export default ScrollRestoration;
