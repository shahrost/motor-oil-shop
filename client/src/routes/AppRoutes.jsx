import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Order from "../pages/Order";
import Viscosity from "../pages/Viscosity";
import ViscosityProducts from "../pages/ViscosityProducts";
import Brands from "../pages/Brands";
import BrandProducts from "../pages/BrandProducts";
import CategoryProducts from "../pages/CategoryProducts";
import Vehicles from "../pages/Vehicles";
import VehicleBrand from "../pages/VehicleBrand";
import VehicleDetail from "../pages/VehicleDetail";
import Promotions from "../pages/Promotions";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Register from "../pages/Register";
import AccountLogin from "../pages/AccountLogin";
import Account from "../pages/Account";

import ProtectedRoute from "../components/ProtectedRoute";
import CustomerProtectedRoute from "../components/CustomerProtectedRoute";

// پنل ادمین حجیمه و مشتری‌ها لازمش ندارن؛ جدا لود می‌شه تا صفحه‌ی اصلی سبک‌تر باشه
const Admin = lazy(() => import("../pages/Admin"));
const AdminOrders = lazy(() => import("../pages/AdminOrders"));

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/products" element={<Products />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/order" element={<Order />} />

        <Route path="/viscosity" element={<Viscosity />} />

        <Route path="/viscosity/:viscosity" element={<ViscosityProducts />} />

        <Route path="/brands" element={<Brands />} />

        <Route path="/brand/:brand" element={<BrandProducts />} />

        <Route path="/category/:category" element={<CategoryProducts />} />

        <Route path="/vehicles" element={<Vehicles />} />

        <Route path="/vehicles/:brand" element={<VehicleBrand />} />

        <Route path="/vehicle/:id" element={<VehicleDetail />} />

        <Route path="/promotions" element={<Promotions />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />

        <Route path="/account-login" element={<AccountLogin />} />

        <Route
          path="/account"
          element={
            <CustomerProtectedRoute>
              <Account />
            </CustomerProtectedRoute>
          }
        />
      </Route>

      {/* Admin Routes جدا می‌ماند */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Suspense fallback={null}>
              <Admin />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <Suspense fallback={null}>
              <AdminOrders />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
