// خطای یک ردیف اکسل. ردیف‌هایی که groupKey یکسان دارن توی گزارش یک‌جا (با شمارش) نشون داده می‌شن؛
// hint توضیح اضافه‌ایه که یک بار برای کل گروه نمایش داده می‌شه (مثلاً لیست برندهای موجود).
class RowError extends Error {
  constructor(message, groupKey, hint) {
    super(message);
    this.name = "RowError";
    this.groupKey = groupKey || message;
    this.hint = hint || "";
  }
}

module.exports = RowError;
