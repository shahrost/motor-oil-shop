import telegramLogo from "../../../../assets/social/telegram.svg";
import whatsappLogo from "../../../../assets/social/whatsapp.svg";

// لینک‌های اشتراک‌گذاری مستقیم (بقیه‌ی برنامه‌ها مثل ایتا، بله و روبیکا از
// اشتراک‌گذاری خود گوشی می‌آن)
export function buildShareLinks(url, text) {
  const u = encodeURIComponent(url);
  const message = encodeURIComponent(`${text}\n${url}`);

  return [
    {
      key: "telegram",
      href: `https://t.me/share/url?url=${u}&text=${encodeURIComponent(text)}`,
      icon: telegramLogo,
    },
    {
      key: "whatsapp",
      href: `https://wa.me/?text=${message}`,
      icon: whatsappLogo,
    },
  ];
}

// کپی متن؛ مرورگرهای قدیمی/صفحه‌ی غیر امن ← روش قدیمی با textarea
export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}
