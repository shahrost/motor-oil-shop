import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard";
import ProductManager from "./ProductManager";

function AdminPanel() {
  return (
    <main>
      <AdminHeader />

      <Dashboard />

      <ProductManager />
    </main>
  );
}

export default AdminPanel;
