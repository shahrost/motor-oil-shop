function NumberInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>

      <input
        type="text"
        inputMode="numeric"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
}

export default NumberInput;
