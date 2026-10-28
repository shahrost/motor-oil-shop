import { Component } from "react";
import { RotateCw, TriangleAlert } from "lucide-react";

import LanguageContext from "../../context/LanguageContext";

// خطای JS داخل یک صفحه به‌جای صفحه‌ی سفید، پیام «مشکلی پیش آمد» با دکمه‌ی بارگذاری دوباره
// نشون می‌ده؛ هدر و فوتر سر جاشون می‌مونن. MainLayout با key={pathname} صداش می‌زنه،
// پس رفتن به صفحه‌ی دیگه خطا رو پاک می‌کنه.
class ErrorBoundary extends Component {
  static contextType = LanguageContext;

  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error("خطای نمایش صفحه", error, info?.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    const { t } = this.context;

    return (
      <div role="alert" className="min-h-[60vh] flex items-center justify-center px-5 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-md border p-8 text-center">
          <TriangleAlert size={48} className="mx-auto text-yellow-500" />

          <h1 className="text-2xl font-extrabold mt-4">{t("common.crashTitle")}</h1>

          <p className="text-gray-600 mt-3">{t("common.crashText")}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 bg-yellow-400 text-gray-950 px-6 py-3 rounded-xl font-bold"
          >
            <RotateCw /> {t("common.reload")}
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
