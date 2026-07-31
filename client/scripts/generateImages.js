import fs from "fs";
import path from "path";

const productsPath = path.join(process.cwd(), "public", "products");

const outputPath = path.join(process.cwd(), "src", "data", "productImages.js");

const brandNames = fs.readdirSync(productsPath);

let content = `const productImages = {\n\n`;

brandNames.forEach((brandFolder) => {
  const folderPath = path.join(productsPath, brandFolder);

  if (!fs.statSync(folderPath).isDirectory()) {
    return;
  }

  const images = fs.readdirSync(folderPath);

  content += `  "${brandFolder}": [\n`;

  images.forEach((image) => {
    const imagePath = `/products/${brandFolder}/${image}`;

    content += `    "${imagePath}",\n`;
  });

  content += `  ],\n\n`;
});

content += `};\n\nexport default productImages;\n`;

fs.writeFileSync(outputPath, content, "utf-8");

console.log("✅ فایل productImages.js ساخته شد");
