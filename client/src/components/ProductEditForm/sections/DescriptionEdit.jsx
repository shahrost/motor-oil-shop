function DescriptionEdit({ editForm, handleEditChange }) {
  return (
    <textarea
      name="description"
      value={editForm.description || ""}
      onChange={handleEditChange}
      placeholder="توضیحات"
      className="border p-3 w-full rounded mb-3"
    />
  );
}

export default DescriptionEdit;
