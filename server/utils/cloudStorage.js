const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");

const FOLDER = "motor-oil-shop/products";
const CONCURRENCY = 6;

function isEnabled() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function configure() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

function isCloudUrl(value) {
  return /^https?:\/\/res\.cloudinary\.com\//.test(String(value || ""));
}

function removeLocalQuietly(filePath) {
  fs.unlink(filePath, () => {});
}

// فایل لوکال را در Cloudinary آپلود می‌کند و آدرس https دائمی برمی‌گرداند.
// بعد از آپلود موفق، فایل موقت لوکال پاک می‌شود.
async function uploadLocalFile(filePath, { keepLocal = false } = {}) {
  configure();

  const result = await cloudinary.uploader.upload(filePath, {
    folder: FOLDER,
    resource_type: "image",
  });

  if (!keepLocal) removeLocalQuietly(filePath);

  return result.secure_url;
}

// آدرسی که باید در دیتابیس ذخیره شود: اگر Cloudinary تنظیم شده باشد آدرس ابری،
// وگرنه (مثلاً محیط توسعه) همان مسیر لوکال /uploads/products/...
async function persistImage(file) {
  if (!file) return "";

  // قبلاً موقع آپلود دسته‌ای منتقل شده
  if (file.url) return file.url;

  if (!isEnabled()) return `/uploads/products/${file.filename}`;

  return uploadLocalFile(file.path);
}

// آپلود هم‌زمان (محدود) چند فایل؛ خروجی: Map(filename -> url)
async function persistImages(files) {
  const urls = new Map();
  const queue = [...files];

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      urls.set(file.filename, await persistImage(file));
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, worker),
  );

  return urls;
}

// public_id را از آدرس Cloudinary درمی‌آورد: .../upload/v123/folder/name.jpg -> folder/name
function publicIdFromUrl(url) {
  const match = String(url).match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);

  return match ? match[1] : null;
}

async function deleteCloudImage(url) {
  const publicId = publicIdFromUrl(url);

  if (!publicId || !isEnabled()) return;

  configure();

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Failed to delete cloud image:", publicId, err.message);
  }
}

module.exports = {
  isEnabled,
  isCloudUrl,
  persistImage,
  persistImages,
  deleteCloudImage,
  uploadLocalFile,
};
