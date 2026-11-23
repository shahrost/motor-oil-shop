import { PHONE_URL } from "../data/contact";

export function smsMessageUrl(message, userAgent = globalThis.navigator?.userAgent || "") {
  const separator = /iPhone|iPad|iPod/i.test(userAgent) ? "&" : "?";
  return `sms:${PHONE_URL.replace(/^tel:/, "")}${separator}body=${encodeURIComponent(message)}`;
}
