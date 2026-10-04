// یک خط «برچسب: مقدار» از مشخصات محصول.
// reserveSpace: اگه مقدار خالی بود خط نامرئی می‌مونه تا کارت‌های کنار هم هم‌تراز بمونن؛
// بدون اون، خط خالی اصلاً رندر نمی‌شه.
// isolate: مقدار لاتین (مثل GL-4) جدا از جهت متن چیده می‌شه تا ترتیب راست‌به‌چپ به‌هم نخوره.
function SpecLine({
  label,
  value,
  className = "",
  reserveSpace = false,
  isolate = false,
  title,
  labelClassName = "text-gray-500",
}) {
  const empty = value === undefined || value === null || value === "";

  if (empty && !reserveSpace) return null;

  return (
    <p
      className={`${className} ${empty ? "invisible" : ""}`}
      aria-hidden={empty ? true : undefined}
      title={title}
    >
      <span className={labelClassName}>{label}</span>{" "}
      {isolate ? <bdi>{value}</bdi> : value}
    </p>
  );
}

// برچسب «API:» با جهت درست در متن راست‌به‌چپ
export function ApiLabel() {
  return (
    <>
      <bdi>API</bdi>:
    </>
  );
}

export default SpecLine;
