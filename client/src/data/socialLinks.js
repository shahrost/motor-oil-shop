import telegramLogo from "../assets/social/telegram.svg";
import whatsappLogo from "../assets/social/whatsapp.svg";
import rubikaLogo from "../assets/social/rubika.png";
import eitaaLogo from "../assets/social/eitaa.png";
import baleLogo from "../assets/social/bale.png";
import { WHATSAPP_URL, PHONE_URL } from "./contact";

// شبکه‌های اجتماعی و راه‌های ارتباطی فوتر
const socialLinks = [
  {
    key: "telegram",
    href: "https://t.me/+Mj8Own1-t2I1NWU0",
    icon: telegramLogo,
  },
  {
    key: "whatsapp",
    href: WHATSAPP_URL,
    icon: whatsappLogo,
  },
  {
    key: "rubika",
    href: "https://rubika.ir/joinc/CACIDHHA0XHNICILSYDUYKWHYGFDXNEG",
    icon: rubikaLogo,
  },
  {
    key: "eitaa",
    href: "https://eitaa.com/joinchat/1845625166C85d3057112",
    icon: eitaaLogo,
  },
  {
    key: "bale",
    href: "https://ble.ir/join/4WM19sBpmk",
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
