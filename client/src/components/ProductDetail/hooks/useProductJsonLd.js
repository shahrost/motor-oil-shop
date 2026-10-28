import { useEffect } from "react";

import buildProductJsonLd from "../helpers/buildProductJsonLd";

const SCRIPT_ID = "product-jsonld";

// تگ <script type="application/ld+json"> محصول در head؛ با رفتن از صفحه حذف می‌شه
function useProductJsonLd(product, name) {
  const json = product ? JSON.stringify(buildProductJsonLd(product, name)) : "";

  useEffect(() => {
    if (!json) return undefined;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCRIPT_ID;
    script.textContent = json;

    document.getElementById(SCRIPT_ID)?.remove();
    document.head.appendChild(script);

    return () => script.remove();
  }, [json]);
}

export default useProductJsonLd;
