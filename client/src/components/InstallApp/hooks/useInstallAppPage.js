import { useState } from "react";
import { detectPlatform, isInAppBrowser } from "../../../utils/detectPlatform";
import useInstallPrompt from "../../../hooks/useInstallPrompt";

function useInstallAppPage() {
  const [platform] = useState(detectPlatform);
  const [inAppBrowser] = useState(isInAppBrowser);
  const { installed, canPrompt, install } = useInstallPrompt();

  return { platform, inAppBrowser, installed, canPrompt, install };
}

export default useInstallAppPage;
