// یک فیلد انتخابی فیلتر (برچسب اختیاری + لیست گزینه‌ها)؛
// فیلتر سریع صفحه‌ی اصلی و فیلترهای صفحه‌ی محصولات هر دو ازش استفاده می‌کنن.
function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  formatLabel = (option) => option.label,
  labelClassName = "block font-bold text-gray-700 mb-2",
  className = "w-full border border-gray-300 rounded-2xl p-3 bg-white text-black",
}) {
  const select = (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {placeholder !== undefined && <option value="">{placeholder}</option>}

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {formatLabel(option)}
        </option>
      ))}
    </select>
  );

  if (!label) return select;

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      {select}
    </div>
  );
}

export default FilterSelect;
