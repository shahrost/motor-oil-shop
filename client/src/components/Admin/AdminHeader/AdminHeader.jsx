import useAdminHeader from "./hooks/useAdminHeader";
import { AdminBrand, AdminActions, AdminNav } from "./sections";

function AdminHeader() {
  const { title, logout } = useAdminHeader();

  return (
    <header
      className="
      bg-white
      shadow
      rounded-xl
      p-5
      mb-5
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        flex-wrap
        gap-3
        "
      >
        <AdminBrand title={title} />

        <AdminActions onLogout={logout} />
      </div>

      <AdminNav />
    </header>
  );
}

export default AdminHeader;
