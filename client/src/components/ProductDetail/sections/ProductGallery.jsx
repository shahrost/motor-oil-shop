import getImageUrl from "../../../utils/getImageUrl";

function ProductGallery({ product }) {
  return (
    <div>
      <div className="bg-gray-50 rounded-3xl p-5 flex items-center justify-center">
        <img
          src={getImageUrl(product.image?.main)}
          alt={product.name}
          className="w-full h-80 object-contain hover:scale-105 transition"
        />
      </div>

      {product.image?.gallery?.length > 0 && (
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {product.image.gallery.map((img, index) => (
            <img
              key={index}
              src={getImageUrl(img)}
              alt={`${product.name}-${index}`}
              className="w-24 h-24 object-contain border rounded-xl cursor-pointer hover:scale-105 transition"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
