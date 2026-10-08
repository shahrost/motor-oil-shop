import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";

import ProtectedRoute from "../components/ProtectedRoute";
import CustomerProtectedRoute from "../components/CustomerProtectedRoute";

// فقط صفحه‌ی اصلی و محصولات (پربازدیدترین ورودی‌ها) همراه بسته‌ی اول می‌آن؛
// بقیه‌ی صفحه‌ها اولین باری که باز می‌شن جدا لود می‌شن تا لود اول سبک‌تر باشه.
// Suspense صفحه‌های مشتری در MainLayout است.
const Login = lazy(() => import("../pages/Login"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Order = lazy(() => import("../pages/Order"));
const Viscosity = lazy(() => import("../pages/Viscosity"));
const ViscosityProducts = lazy(() => import("../pages/ViscosityProducts"));
const Brands = lazy(() => import("../pages/Brands"));
const BrandProducts = lazy(() => import("../pages/BrandProducts"));
const CategoryProducts = lazy(() => import("../pages/CategoryProducts"));
const Vehicles = lazy(() => import("../pages/Vehicles"));
const VehicleBrand = lazy(() => import("../pages/VehicleBrand"));
const VehicleDetail = lazy(() => import("../pages/VehicleDetail"));
const Promotions = lazy(() => import("../pages/Promotions"));
const Contact = lazy(() => import("../pages/Contact"));
const About = lazy(() => import("../pages/About"));
const Register = lazy(() => import("../pages/Register"));
const AccountLogin = lazy(() => import("../pages/AccountLogin"));
const Account = lazy(() => import("../pages/Account"));

// پنل ادمین حجیمه و مشتری‌ها لازمش ندارن
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
