import brandLogo from "../../../../assets/logo/shahram-monogram-black.svg";

function AdminBrand() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={brandLogo}
        alt=""
        className="h-7 w-auto select-none dark:invert"
        draggable="false"
      />

      <h1
        className="
        text-2xl
        font-bold
        "
      >
        پنل مدیریت محصولات
      </h1>
    </div>
  );
}

export default AdminBrand;
