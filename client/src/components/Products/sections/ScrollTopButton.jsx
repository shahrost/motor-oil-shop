function ScrollTopButton({ show, onClick }) {
  if (!show) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 left-6 bg-black text-white w-12 h-12 rounded-full shadow-xl text-xl"
      aria-label="بازگشت به بالای صفحه"
    >
      ↑
    </button>
  );
}

export default ScrollTopButton;