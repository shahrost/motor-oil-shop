import brandLogo from "../../../../assets/logo/shahram-logo.svg";
import brandLogoLight from "../../../../assets/logo/shahram-logo-light.svg";

function AdminBrand({ title }) {
  return (
    <div className="flex items-center gap-3">
      {/* حالت روشن: لوگوی سرمه‌ای؛ حالت شب: لوگوی نارنجی */}
      <img
        src={brandLogoLight}
        alt=""
        width="40"
        height="28"
        className="h-7 w-auto select-none dark:hidden"
        draggable="false"
      />
      <img
        src={brandLogo}
        alt=""
        width="40"
        height="28"
        className="hidden h-7 w-auto select-none dark:block"
        draggable="false"
      />

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
