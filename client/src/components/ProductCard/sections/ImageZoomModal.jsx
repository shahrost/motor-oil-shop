// نمایش بزرگ عکس محصول؛ با کلیک بیرون عکس یا دکمه‌ی × بسته می‌شه
function ImageZoomModal({ src, alt, onError, onClose }) {
  return (
    <div
      onClick={onClose}
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/80
      p-4
      "
    >
      <button
        onClick={onClose}
        aria-label="close"
        className="
        absolute
        top-4
        end-4
        text-white
        text-4xl
        leading-none
        "
      >
        ×
      </button>

      <img
        src={src}
        alt={alt}
        onError={onError}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
      />
    </div>
  );
}

export default ImageZoomModal;
