import socialLinks from "../../../../data/socialLinks";
import SocialLink from "./SocialLink";

// دکمه‌های پیام‌رسان‌ها و تماس تلفنی (از data/socialLinks)
function SocialLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {socialLinks.map((item) => (
        <SocialLink key={item.key} item={item} />
      ))}
    </div>
  );
}

export default SocialLinks;
