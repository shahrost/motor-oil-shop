import brandLogo from "../../../../assets/logo/shahram-logo.svg";
import brandLogoLight from "../../../../assets/logo/shahram-logo-light.svg";

function AdminBrand({ title }) {
  return (
    <div className="flex items-center gap-3">
      {/* حالت روشن: لوگوی سرمه‌ای؛ حالت شب: لوگوی نارنجی.
          hidden روی span، چون قاعده‌ی سراسری img { display: block } در index.css
          (بیرون از layer) کلاس hidden خود img رو بی‌اثر می‌کنه و هر دو لوگو دیده می‌شدن */}
      <span className="dark:hidden">
        <img
          src={brandLogoLight}
          alt=""
          width="40"
          height="28"
          className="h-7 w-auto select-none"
          draggable="false"
        />
      </span>
      <span className="hidden dark:block">
        <img
          src={brandLogo}
          alt=""
          width="40"
          height="28"
          className="h-7 w-auto select-none"
          draggable="false"
        />
      </span>

      <h1
        className="
        text-2xl
        font-bold
        "
      >
        {title}
      </h1>
    </div>
  );
}

export default AdminBrand;
