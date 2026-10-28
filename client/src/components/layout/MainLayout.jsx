import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useCanonicalUrl } from "../../hooks/usePageMeta";

import Header from "./Header";
import Footer from "./Footer";
import ErrorBoundary from "./ErrorBoundary";
import ProductsLoadError from "./ProductsLoadError";
import ScrollRestoration from "./ScrollRestoration";

function MainLayout() {
  useCanonicalUrl();
  const { pathname } = useLocation();

  return (
    <>
      <ScrollRestoration />

      <Header />

      <ProductsLoadError />

      <main>
        {/* خطای یک صفحه فقط همون صفحه رو می‌گیره؛ با رفتن به آدرس دیگه (key) پاک می‌شه */}
        <ErrorBoundary key={pathname}>
          {/* صفحه‌ها جدا لود می‌شن؛ تا رسیدنشون جای خالی نگه داشته می‌شه تا فوتر بالا نپره */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
