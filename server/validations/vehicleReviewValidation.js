const NAME_MAX = 40;
const TEXT_MAX = 600;

// حذف کاراکترهای کنترلی (به‌جز خط جدید) و فاصله‌ی اضافه
function clean(value, max) {
  return String(value || "")
    .replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/ {2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

function validateReview(data) {
  const errors = [];
  const rating = Number(data.rating);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.push("امتیاز باید عددی بین ۱ تا ۵ باشد");
  }

  if (String(data.text || "").trim().length > TEXT_MAX) {
    errors.push(`متن نظر حداکثر ${TEXT_MAX} کاراکتر است`);
  }

  return {
    valid: errors.length === 0,
    errors,
    value: {
      rating,
      name: clean(data.name, NAME_MAX),
      text: clean(data.text, TEXT_MAX),
    },
  };
}

module.exports = { validateReview };
