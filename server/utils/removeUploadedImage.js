const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "..", "uploads", "products");

function removeUploadedImage(imagePath) {
  if (!imagePath) return;

  const filename = path.basename(imagePath);
  const fullPath = path.join(uploadsDir, filename);

  fs.unlink(fullPath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Failed to delete product image:", fullPath, err.message);
    }
  });
}

function removeProductImages(image) {
  if (!image) return;

  removeUploadedImage(image.main);
  (image.gallery || []).forEach(removeUploadedImage);
}

module.exports = { removeUploadedImage, removeProductImages };
