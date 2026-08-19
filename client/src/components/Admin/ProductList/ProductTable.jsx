import ProductRow from "./ProductRow";

function ProductTable({ products, startEdit, deleteProduct }) {
  return (
    <>
      {products.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
          startEdit={startEdit}
          deleteProduct={deleteProduct}
        />
      ))}
    </>
  );
}

export default ProductTable;
