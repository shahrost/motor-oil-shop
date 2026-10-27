import productTypes from "../data/productOptions/productTypes";

export const OTHER_TYPE = { id: "other", label: "سایر", labelEn: "Other" };

export function classifyProductType(category) {
  const text = String(category || "").toLowerCase();

  const match = productTypes.find((type) =>
    type.keywords.some((keyword) => text.includes(keyword.toLowerCase())),
  );

  return match ? match.id : OTHER_TYPE.id;
}
