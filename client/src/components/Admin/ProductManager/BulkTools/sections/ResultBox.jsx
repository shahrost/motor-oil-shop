function ResultBox({ title, children }) {
  return (
    <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
      <p className="font-bold mb-2">{title}</p>
      {children}
    </div>
  );
}

export default ResultBox;
