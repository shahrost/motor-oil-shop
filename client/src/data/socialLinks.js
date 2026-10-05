import telegramLogo from "../assets/social/telegram.svg";
import whatsappLogo from "../assets/social/whatsapp.svg";
import rubikaLogo from "../assets/social/rubika.png";
import eitaaLogo from "../assets/social/eitaa.png";
import baleLogo from "../assets/social/bale.png";
import { WHATSAPP_URL, PHONE_URL } from "./contact";

// راه‌های ارتباطی فوتر — همه مستقیم به چت خصوصی فروشگاه می‌روند (نه کانال)
const socialLinks = [
  {
    key: "telegram",
    href: "https://t.me/shr546",
    icon: telegramLogo,
  },
  {
    key: "whatsapp",
    href: WHATSAPP_URL,
    icon: whatsappLogo,
  },
  {
    key: "rubika",
    href: "https://rubika.ir/SHAHROST1",
    icon: rubikaLogo,
  },
  {
    key: "eitaa",
    href: "https://eitaa.com/shahrost",
    icon: eitaaLogo,
  },
  {
    key: "bale",
    href: "https://ble.ir/shahrost",
    icon: baleLogo,
  },
  {
    key: "phone",
    href: PHONE_URL,
    emoji: "📞",
    isPhone: true,
  },
];

export default socialLinks;
