import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorBoundary from "../components/layout/ErrorBoundary";
import lazyPage from "../utils/lazyPage";
import Home from "../pages/Home";
import Products from "../pages/Products";

import ProtectedRoute from "../components/ProtectedRoute";
import CustomerProtectedRoute from "../components/CustomerProtectedRoute";

// فقط صفحه‌ی اصلی و محصولات (پربازدیدترین ورودی‌ها) همراه بسته‌ی اول می‌آن؛
// بقیه‌ی صفحه‌ها اولین باری که باز می‌شن جدا لود می‌شن تا لود اول سبک‌تر باشه.
// Suspense صفحه‌های مشتری در MainLayout است. lazyPage: بعد از دیپلوی، تب قدیمی یک بار رفرش می‌شه.
const Login = lazyPage(() => import("../pages/Login"));
const ProductDetail = lazyPage(() => import("../pages/ProductDetail"));
const Cart = lazyPage(() => import("../pages/Cart"));
const Order = lazyPage(() => import("../pages/Order"));
const Viscosity = lazyPage(() => import("../pages/Viscosity"));
const ViscosityProducts = lazyPage(() => import("../pages/ViscosityProducts"));
const Brands = lazyPage(() => import("../pages/Brands"));
const BrandProducts = lazyPage(() => import("../pages/BrandProducts"));
const CategoryProducts = lazyPage(() => import("../pages/CategoryProducts"));
const Vehicles = lazyPage(() => import("../pages/Vehicles"));
const VehicleBrand = lazyPage(() => import("../pages/VehicleBrand"));
const VehicleDetail = lazyPage(() => import("../pages/VehicleDetail"));
const Promotions = lazyPage(() => import("../pages/Promotions"));
const About = lazyPage(() => import("../pages/About"));
const Register = lazyPage(() => import("../pages/Register"));
const AccountLogin = lazyPage(() => import("../pages/AccountLogin"));
const Account = lazyPage(() => import("../pages/Account"));
const AccountOrders = lazyPage(() => import("../pages/AccountOrders"));
const AccountFavorites = lazyPage(() => import("../pages/AccountFavorites"));
const InstallApp = lazyPage(() => import("../pages/InstallApp"));
const NotFound = lazyPage(() => import("../pages/NotFound"));

// پنل ادمین حجیمه و مشتری‌ها لازمش ندارن
const Admin = lazyPage(() => import("../pages/Admin"));
const AdminOrders = lazyPage(() => import("../pages/AdminOrders"));

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

        {/* «تماس با ما» در «درباره ما» ادغام شد؛ لینک‌های قدیمی به اونجا می‌رن */}
        <Route path="/contact" element={<Navigate to="/about" replace />} />

        <Route path="/about" element={<About />} />

        <Route path="/app" element={<InstallApp />} />

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

        <Route
          path="/account/orders"
          element={
            <CustomerProtectedRoute>
              <AccountOrders />
            </CustomerProtectedRoute>
          }
        />

        <Route
          path="/account/favorites"
          element={
            <CustomerProtectedRoute>
              <AccountFavorites />
            </CustomerProtectedRoute>
          }
        />

        {/* هر آدرس نامعتبر: صفحه‌ی «پیدا نشد» با هدر و فوتر */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Routes جدا می‌ماند */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <Suspense fallback={null}>
                <AdminOrders />
              </Suspense>
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
