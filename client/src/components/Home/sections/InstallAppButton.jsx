import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";
import useInstallPrompt from "../../../hooks/useInstallPrompt";

const className = `
  inline-flex
  items-center
  gap-1.5
  px-3
  py-1.5
  rounded-full
  bg-yellow-400
  text-black
  text-sm
  font-bold
  shadow-sm
  hover:bg-yellow-300
  hover:shadow-md
  transition
`;

// دکمه‌ی «نصب اپلیکیشن» بالای کارت «روانکار»؛ هم‌شکل «راهنمای سایت».
// اگه مرورگر اجازه‌ی نصب مستقیم بده (Chrome اندروید/لپ‌تاپ) همون‌جا نصب می‌کنه،
// وگرنه (آیفون، تلگرام و…) صفحه‌ی راهنمای /app باز می‌شه. داخل اپ نصب‌شده دیده نمی‌شه.
function InstallAppButton({ label }) {
  const { installed, canPrompt, install } = useInstallPrompt();

  if (installed) return null;

  const content = (
    <>
      <Smartphone size={16} />
      {label}
    </>
  );

  if (canPrompt) {
    return (
      <button type="button" onClick={install} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link to="/app" className={className}>
      {content}
    </Link>
  );
}

export default InstallAppButton;
