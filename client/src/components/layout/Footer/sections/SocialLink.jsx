import { useContext } from "react";

import LanguageContext from "../../../../context/LanguageContext";

// یک دکمه‌ی گرد شبکه‌ی اجتماعی با برچسب؛ تماس تلفنی در همون تب و با ایموجی
function SocialLink({ item }) {
  const { t } = useContext(LanguageContext);
  const label = t(`footer.social.${item.key}`);

  return (
    <a
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
        ${item.isPhone ? "bg-yellow-400 text-2xl" : "bg-white p-2"}
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
}

export default SocialLink;
