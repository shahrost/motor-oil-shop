// ذخیره‌ی فایلی که از سرور گرفته شده (Blob) با نام دلخواه؛ روی موبایل هم کار می‌کنه
function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  // کمی صبر تا مرورگر (به‌خصوص سافاری) دانلود رو شروع کنه
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default downloadBlob;
