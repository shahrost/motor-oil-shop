const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/products");
  },

  filename(req, file, cb) {
    const name = Date.now() + "-" + Math.round(Math.random() * 1000000000);

    cb(null, name + path.extname(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".jfif", ".gif", ".bmp"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `فرمت فایل «${file.originalname}» مجاز نیست (فرمت آن: ${ext || "نامشخص"}). فرمت‌های مجاز: jpg, jpeg, png, webp, jfif, gif, bmp`,
      ),
    );
  }
}

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
