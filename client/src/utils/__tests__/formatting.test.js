import { describe, expect, it } from "vitest";

import { cleanPhoneInput } from "../phoneInput";
import { toLatinDigits, toPersianDigits } from "../digits";
import formatPrice from "../formatPrice";

describe("cleanPhoneInput", () => {
  it("ارقام فارسی و عربی کیبورد گوشی رو به انگلیسی تبدیل می‌کنه", () => {
    expect(cleanPhoneInput("۰۹۱۲۳۴۵۶۷۸۹")).toBe("09123456789");
    expect(cleanPhoneInput("٠٩١٢٣٤٥٦٧٨٩")).toBe("09123456789");
  });

  it("فاصله و خط تیره حذف و حداکثر ۱۱ رقم نگه داشته می‌شه", () => {
    expect(cleanPhoneInput("0912-345 67 89 99")).toBe("09123456789");
  });
});

describe("digits", () => {
  it("رفت و برگشت ارقام", () => {
    expect(toPersianDigits("1405")).toBe("۱۴۰۵");
    expect(toLatinDigits("۱۴۰۵")).toBe("1405");
  });
});

describe("formatPrice", () => {
  it("فارسی با ارقام فارسی", () => {
    expect(formatPrice(1250000, "fa")).toBe("۱٬۲۵۰٬۰۰۰ تومان");
  });

  it("انگلیسی با ارقام انگلیسی", () => {
    expect(formatPrice(1250000, "en")).toBe("1,250,000 Toman");
  });
});
