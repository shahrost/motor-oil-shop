import { useEffect, useState } from "react";
import { isStandalone } from "../utils/detectPlatform";

// نصب PWA: رویداد beforeinstallprompt در index.html گرفته و در window نگه داشته می‌شه
// (صفحه‌ی /app و دکمه‌ی «نصب اپلیکیشن» صفحه‌ی اصلی)
function useInstallPrompt() {
  const [installed, setInstalled] = useState(isStandalone);
  const [promptEvent, setPromptEvent] = useState(
    () => window.__shoilInstallPrompt || null,
  );

  useEffect(() => {
    const onPrompt = () => setPromptEvent(window.__shoilInstallPrompt || null);
    const onInstalled = () => {
      window.__shoilInstallPrompt = null;
      setPromptEvent(null);
      setInstalled(true);
    };

    window.addEventListener("shoil:installprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("shoil:installprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    // هر پیشنهاد فقط یک بار قابل استفاده است
    window.__shoilInstallPrompt = null;
    setPromptEvent(null);
    if (outcome === "accepted") setInstalled(true);
  };

  return { installed, canPrompt: Boolean(promptEvent), install };
}

export default useInstallPrompt;
