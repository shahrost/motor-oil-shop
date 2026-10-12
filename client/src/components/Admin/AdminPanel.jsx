import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard";
import ProductManager from "./ProductManager";
import ReviewManager from "./ReviewManager";

function AdminPanel() {
  return (
    <main>
      <AdminHeader />

      <Dashboard />

      <ProductManager />

      <ReviewManager />
    </main>
  );
}

export default AdminPanel;
