const PERSIAN_LETTERS = /[؀-ۿ]/;

// در نسخه‌ی انگلیسی، متنی که ترجمه نداره و فارسی مونده (توضیحات محصول، اسم برند/محصول بی‌ترجمه)
// با dir="rtl" و lang="fa" نمایش داده می‌شه تا ترتیب کلمه‌ها به‌هم نریزه؛ روی همون عنصر spread می‌شه:
// <p {...untranslatedProps(text, language)}>
export function untranslatedProps(text, language) {
  if (language !== "en" || !PERSIAN_LETTERS.test(String(text ?? ""))) return {};

  return { dir: "rtl", lang: "fa" };
}

export default untranslatedProps;
