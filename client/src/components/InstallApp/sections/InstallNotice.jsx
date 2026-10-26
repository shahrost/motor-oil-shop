// پیام کوتاه بالای راهنما (نصب شده / مرورگر داخلی تلگرام و…)
function InstallNotice({ tone = "info", children }) {
  const colors =
    tone === "success"
      ? "bg-green-50 border-green-300 text-green-800"
      : "bg-yellow-50 border-yellow-300 text-yellow-900";

  return (
    <div className={`mt-6 border rounded-xl p-4 text-center leading-7 ${colors}`}>
      {children}
    </div>
  );
}

export default InstallNotice;
