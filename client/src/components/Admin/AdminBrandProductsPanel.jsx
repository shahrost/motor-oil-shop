import { useParams } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminScrollButtons from "./AdminScrollButtons";
import ProductManager from "./ProductManager";

export default function AdminBrandProductsPanel() {
  const { brand } = useParams();
  return (
    <main className="mx-auto max-w-5xl px-4 pt-4 pb-32">
      <AdminHeader />
      <ProductManager key={brand} brand={brand} />
      <AdminScrollButtons />
    </main>
  );
}
