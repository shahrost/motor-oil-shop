import { useEffect, useState } from "react";
import {
  detectPlatform,
  isInAppBrowser,
  isStandalone,
} from "../helpers/detectPlatform";

// رویداد beforeinstallprompt در index.html گرفته و در window نگه داشته می‌شه
function useInstallAppPage() {
  const [platform] = useState(detectPlatform);
  const [inAppBrowser] = useState(isInAppBrowser);
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

  return {
    platform,
    inAppBrowser,
    installed,
    canPrompt: Boolean(promptEvent),
    install,
  };
}

export default useInstallAppPage;
