import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard";
import ProductManager from "./ProductManager";
import OrderManager from "./OrderManager";

function AdminPanel() {
  return (
    <main>
      <AdminHeader />

      <Dashboard />

      <ProductManager />

      <OrderManager />
    </main>
  );
}

export default AdminPanel;
