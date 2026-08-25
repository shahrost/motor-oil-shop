import productTypes from "../data/productOptions/productTypes";

const OTHER_TYPE = { id: "other", label: "سایر", labelEn: "Other" };

export function classifyProductType(category) {
  const text = String(category || "").toLowerCase();

  const match = productTypes.find((type) =>
    type.keywords.some((keyword) => text.includes(keyword.toLowerCase())),
  );

  return match ? match.id : OTHER_TYPE.id;
}

export function getProductTypeOptions(language = "fa") {
  return [
    { value: "همه", label: language === "en" ? "All" : "همه" },
    ...productTypes.map((type) => ({
      value: type.id,
      label: language === "en" ? type.labelEn : type.label,
    })),
    {
      value: OTHER_TYPE.id,
      label: language === "en" ? OTHER_TYPE.labelEn : OTHER_TYPE.label,
    },
  ];
}
