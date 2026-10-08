import { API_ORIGIN } from "../../../../../api/config";

const FILE_INPUT_CLASS = "block w-full mb-4 text-sm";

// فیلدهای مشترک فرم‌های ایمپورت: لینک فایل نمونه، اکسل، عکس‌ها و گزینه‌ی حذف موارد غایب
function ImportFields({ templateFile, templateLabel, imagesLabel, removeLabel, importer }) {
  return (
    <>
      <a
        href={`${API_ORIGIN}/templates/${templateFile}`}
        download
        className="inline-block text-sm text-blue-600 underline mb-4"
      >
        {templateLabel}
      </a>

      <label className="block text-sm font-bold mb-1">فایل اکسل</label>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e) => importer.setFile(e.target.files[0])}
        className={FILE_INPUT_CLASS}
      />

      <label className="block text-sm font-bold mb-1">{imagesLabel}</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => importer.setImages(Array.from(e.target.files))}
        className={FILE_INPUT_CLASS}
      />

      <label className="flex items-center gap-2 text-sm mb-4">
        <input
          type="checkbox"
          checked={importer.removeMissing}
          onChange={(e) => importer.setRemoveMissing(e.target.checked)}
        />
        {removeLabel}
      </label>
    </>
  );
}

export default ImportFields;
