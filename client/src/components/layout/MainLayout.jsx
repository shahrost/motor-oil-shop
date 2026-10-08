import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

function MainLayout() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <main>
        {/* صفحه‌ها جدا لود می‌شن؛ تا رسیدنشون جای خالی نگه داشته می‌شه تا فوتر بالا نپره */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
