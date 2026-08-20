import { useContext } from "react";
import brandLogo from "../../assets/logo/shahram-monogram-yellow.svg";
import telegramLogo from "../../assets/social/telegram.svg";
import whatsappLogo from "../../assets/social/whatsapp.svg";
import rubikaLogo from "../../assets/social/rubika.png";
import eitaaLogo from "../../assets/social/eitaa.png";
import baleLogo from "../../assets/social/bale.png";
import LanguageContext from "../../context/LanguageContext";

const socialLinks = [
  {
    key: "telegram",
    href: "https://t.me/+Mj8Own1-t2I1NWU0",
    icon: telegramLogo,
  },
  {
    key: "whatsapp",
    href: "https://wa.me/989198334264",
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
    href: "tel:+989198334264",
    emoji: "📞",
    isPhone: true,
  },
];

function Footer() {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={brandLogo}
              alt=""
              className="h-8 md:h-9 w-auto select-none"
              draggable="false"
            />

            <h2 className="text-yellow-400 text-2xl md:text-3xl font-extrabold">
              شهرام روغن
            </h2>
          </div>

          <p className="text-gray-300 leading-8 max-w-xl mx-auto">
            {t("footer.tagline")}
          </p>

          <p className="text-gray-400 mt-3">shahram_roghan</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {socialLinks.map((item) => {
            const label = t(`footer.social.${item.key}`);

            return (
              <a
                key={item.key}
                href={item.href}
                target={item.isPhone ? undefined : "_blank"}
                rel={item.isPhone ? undefined : "noreferrer"}
                title={label}
                className="flex flex-col items-center gap-2 group"
              >
                <span
                  className={`
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  shadow
                  transition
                  group-hover:scale-110
                  group-hover:shadow-lg
                  ${item.isPhone ? "bg-blue-600 text-2xl" : "bg-white p-2"}
                  `}
                >
                  {item.isPhone ? (
                    item.emoji
                  ) : (
                    <img
                      src={item.icon}
                      alt={label}
                      className="w-full h-full object-contain"
                    />
                  )}
                </span>

                <span className="text-gray-400 text-xs group-hover:text-yellow-400 transition">
                  {label}
                </span>
              </a>
            );
          })}
        </div>

        <div
          className="
          border-t
          border-gray-700
          mt-8
          pt-5
          text-center
          text-gray-400
          text-sm
        "
        >
          © {new Date().getFullYear()} شهرام روغن - {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
