import { useCallback, useEffect, useRef, useState } from "react";

import useEscapeKey from "../../../../hooks/useEscapeKey";
import { buildShareLinks, copyText } from "../helpers/shareLinks";

const COPIED_MS = 2000;

// منوی اشتراک‌گذاری: باز/بسته (کلیک بیرون و Escape می‌بندن)، لینک‌های مستقیم،
// کپی لینک و اشتراک‌گذاری خود گوشی/سیستم (اگه مرورگر پشتیبانی کنه).
// آدرس همون لحظه از نوار آدرس خونده می‌شه (مثلاً ?part=filter هم همراهش می‌ره).
function useShare(text) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  useEscapeKey(close);

  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, close]);

  useEffect(() => {
    if (!copied) return undefined;

    const timer = setTimeout(() => setCopied(false), COPIED_MS);

    return () => clearTimeout(timer);
  }, [copied]);

  const url = typeof window === "undefined" ? "" : window.location.href;

  async function copyLink() {
    try {
      await copyText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function shareNative() {
    try {
      await navigator.share({ title: text, text, url: window.location.href });
      close();
    } catch {
      // کاربر پنجره رو بست؛ کاری لازم نیست
    }
  }

  return {
    rootRef,
    open,
    toggle: () => setOpen((value) => !value),
    close,
    links: open ? buildShareLinks(url, text) : [],
    canShareNative: typeof navigator !== "undefined" && Boolean(navigator.share),
    copied,
    copyLink,
    shareNative,
  };
}

export default useShare;
