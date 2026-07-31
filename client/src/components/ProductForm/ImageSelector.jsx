import productImages from "../../data/productImages";
import brandFolderMap from "../../data/brandFolderMap";

function ImageSelector({ product, updateField }) {
  const folderName = Object.keys(brandFolderMap).find(
    (folder) => brandFolderMap[folder] === product.brand,
  );

  const images = productImages[folderName] || [];

  return (
    <div className="border rounded-xl p-4 bg-gray-50 mt-4" dir="rtl">
      <h3 className="text-xl font-bold mb-4">انتخاب تصویر محصول</h3>

      {!product.brand ? (
        <p className="text-gray-500">ابتدا برند محصول را انتخاب کنید</p>
      ) : images.length === 0 ? (
        <p className="text-gray-500">برای این برند هنوز تصویری ثبت نشده است</p>
      ) : (
        <div>
          <h4 className="font-bold mb-3">{product.brand}</h4>

          <div className="flex flex-wrap gap-4">
            {images.map((image) => (
              <img
                key={image}
                src={image}
                alt={product.brand}
                onClick={() =>
                  updateField("image", {
                    main: image,
                    gallery: [],
                  })
                }
                className="
                w-32
                h-32
                object-contain
                bg-white
                border
                rounded-xl
                p-2
                cursor-pointer
                hover:scale-105
                transition
                "
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSelector;
