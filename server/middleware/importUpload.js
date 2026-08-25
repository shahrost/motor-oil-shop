const multer = require("multer");
const path = require("path");
const fs = require("fs");

const TMP_DIR = "uploads/tmp";
const PRODUCTS_DIR = "uploads/products";

fs.mkdirSync(TMP_DIR, { recursive: true });
fs.mkdirSync(PRODUCTS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, file.fieldname === "images" ? PRODUCTS_DIR : TMP_DIR);
  },

  filename(req, file, cb) {
    const name = Date.now() + "-" + Math.round(Math.random() * 1000000000);

    cb(null, name + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "file") {
    const allowed = [".xlsx", ".xls", ".csv"];
    if (allowed.includes(ext)) return cb(null, true);
    return cb(new Error("فایل داده باید xlsx یا xls یا csv باشد"));
  }

  if (file.fieldname === "images") {
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".jfif", ".gif", ".bmp"];
    if (allowed.includes(ext)) return cb(null, true);
    return cb(
      new Error(
        `فرمت عکس «${file.originalname}» مجاز نیست (فرمت آن: ${ext || "نامشخص"}). فرمت‌های مجاز: jpg, jpeg, png, webp, jfif, gif, bmp`,
      ),
    );
  }

  cb(new Error("فیلد نامعتبر"));
}

// عکس‌ها مستقیم روی دیسک نوشته می‌شوند (نه در حافظه) تا ایمپورت چند صد
// عکسی باعث پر شدن حافظه سرور نشود.
const importUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 1500,
  },
});

module.exports = importUpload;
