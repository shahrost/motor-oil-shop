import { AndroidInstall, IosInstall, InstallNotice } from "./sections";
import useInstallAppPage from "./hooks/useInstallAppPage";
import brand from "../../data/brand";

// صفحه‌ی «نصب اپلیکیشن» (/app) — در منو نیست؛ لینکش در کانال‌ها پخش می‌شه
function InstallApp() {
  const { platform, inAppBrowser, installed, canPrompt, install } =
    useInstallAppPage();

  const browserName = platform === "ios" ? "Safari" : "Chrome";

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <section className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        <img
          src="/icons/icon-192.png"
          alt={brand.name}
          className="w-20 h-20 mx-auto rounded-2xl shadow"
        />

        <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">
          اپلیکیشن {brand.name}
        </h1>

        <p className="text-center mt-3 text-gray-700 leading-8">
          {brand.name} را روی گوشی نصب کنید تا همیشه با یک لمس، خودروی خود را
          انتخاب و سفارش ثبت کنید.
        </p>

        {installed && (
          <InstallNotice tone="success">
            اپلیکیشن روی این گوشی نصب شده است. از آیکون {brand.name} در صفحه‌ی
            گوشی استفاده کنید.
          </InstallNotice>
        )}

        {!installed && inAppBrowser && (
          <InstallNotice>
            داخل تلگرام، اینستاگرام و برنامه‌های مشابه نصب ممکن نیست. لینک این
            صفحه را کپی کنید و در مرورگر {browserName} باز کنید.
          </InstallNotice>
        )}

        {!installed && platform === "desktop" && (
          <InstallNotice>
            برای نصب روی گوشی، همین صفحه (shoil.ir/app) را با گوشی باز کنید.
          </InstallNotice>
        )}

        {!installed && platform !== "ios" && (
          <AndroidInstall canPrompt={canPrompt} onInstall={install} />
        )}

        {!installed && platform !== "android" && <IosInstall />}
      </section>
    </div>
  );
}

export default InstallApp;
