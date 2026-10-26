import brand from "../../../data/brand";
import { ShareIcon, AddSquareIcon } from "./IosIcons";

const STEPS = [
  {
    icon: null,
    text: "این صفحه را در مرورگر Safari باز کنید.",
  },
  {
    icon: ShareIcon,
    text: "دکمه‌ی Share (مربع با فلش رو به بالا) را در پایین صفحه بزنید.",
  },
  {
    icon: AddSquareIcon,
    text: "در فهرست باز شده پایین بروید و «Add to Home Screen» را بزنید.",
  },
  {
    icon: null,
    text: `بالای صفحه «Add» را بزنید. آیکون ${brand.name} روی صفحه‌ی گوشی اضافه می‌شود.`,
  },
];

function IosInstall() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center">نصب روی آیفون</h2>

      <ol className="mt-5 space-y-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <li
              key={step.text}
              className="flex items-center gap-3 bg-gray-100 rounded-xl p-4"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center">
                {(index + 1).toLocaleString("fa-IR")}
              </span>

              <span className="flex-1 text-gray-700 leading-7">{step.text}</span>

              {Icon && (
                <span className="shrink-0 text-blue-600">
                  <Icon className="w-7 h-7" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default IosInstall;
