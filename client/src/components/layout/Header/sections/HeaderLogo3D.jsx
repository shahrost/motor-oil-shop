import brandLogo from "../../../../assets/logo/shahram-monogram-yellow.svg";

// لوگوی سه‌بعدی هدر: چند لایه از مونوگرام پشت سر هم روی محور Z چیده می‌شن تا ضخامت واقعی بسازن،
// و کل مجموعه مثل صفحه‌ی گردان دور محور عمودی می‌چرخه (استایل‌ها در index.css → .logo-3d)
const LAYERS = 16;

function HeaderLogo3D({ label }) {
  // Vite فایل‌های کوچک SVG رو data URI می‌کنه؛ بدون کوتیشن داخل url() نامعتبر می‌شه
  const mask = `url(${JSON.stringify(brandLogo)})`;

  return (
    <span role="img" aria-label={label} className="logo-3d">
      <span className="logo-3d-spin">
        {Array.from({ length: LAYERS }, (_, i) => {
          const isFace = i === 0 || i === LAYERS - 1;
          return (
            <span
              key={i}
              className={isFace ? "logo-3d-layer logo-3d-face" : "logo-3d-layer logo-3d-edge"}
              style={{
                "--logo-depth": i / (LAYERS - 1) - 0.5,
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
            />
          );
        })}
      </span>
    </span>
  );
}

export default HeaderLogo3D;
