function StatusEdit({ editForm, handleEditChange }) {
  return (
    <>
      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          name="isBestSeller"
          checked={editForm.isBestSeller || false}
          onChange={handleEditChange}
        />
        پرفروش
      </label>

      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          name="isActive"
          checked={editForm.isActive || false}
          onChange={handleEditChange}
        />
        فعال
      </label>
    </>
  );
}

export default StatusEdit;
