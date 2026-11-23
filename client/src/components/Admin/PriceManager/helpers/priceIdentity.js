import { toLatinDigits } from "../../../../utils/digits";

export const identityText = (value) => toLatinDigits(value).toLowerCase()
  .replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\s\u200c\u200e\u200f_-]+/g, "");

// Aliases aid recognition; this is not an allow-list. New catalogue brands work too.
const aliases = [
  ["وم اویل", "womoil", "wom"], ["ایدلوب", "aidlube", "aidlub"], ["ادینول", "addinol"],
  ["سمن شیمی", "semanchimie", "semanshimi"], ["توتال", "total"], ["ووفر", "woofer"],
  ["پترولکس", "petrolex"], ["بهتام", "behtam"], ["فیلتر میهن", "میهن", "mihan"],
  ["فیلتر لوکومبیل", "لوکومبیل", "locomobil"], ["فیلتر گیربکس ATFO", "atfo"],
  ["لوکینی", "lookini"], ["بهران", "behran"], ["ایرانول", "iranol"],
  ["پارس", "pars"], ["کاسپین", "caspian"], ["سرکان", "serkan"],
];

export function canonicalBrand(value) {
  const key = identityText(value);
  return aliases.find((names) => names.some((name) => identityText(name) === key))?.[0] || String(value || "").trim();
}

function sameBrand(a, b) {
  return !!a && !!b && identityText(canonicalBrand(a)) === identityText(canonicalBrand(b));
}

// The supplied Seman Chimie company list includes its Petrolex-labelled oils.
export function supplierHasBrand(supplier, brand) {
  return sameBrand(supplier, brand) || (sameBrand(supplier, "سمن شیمی") && sameBrand(brand, "پترولکس"));
}

export function detectSupplier(text, brands = []) {
  const source = identityText(text).replace(/[|.,:،؛()]/g, "");
  const names = [...new Set([...aliases.map((group) => group[0]), ...brands].map(canonicalBrand))];
  const found = names.filter((brand) => {
    const forms = aliases.find((group) => sameBrand(group[0], brand)) || [brand];
    return forms.some((form) => identityText(form).length >= 3 && source.includes(identityText(form)));
  });
  return found.length === 1 ? found[0] : "";
}

export function exactSkuProducts(value, products) {
  // Keep token boundaries: AL-ENG-001 cannot match AL-ENG-001-4L.
  const tokens = toLatinDigits(value).toLowerCase().replace(/[‐‑–—]/g, "-")
    .replace(/([a-z]+)-\s+(?=[a-z\d])/gi, "$1-")
    .match(/[\p{L}\p{N}]+(?:[-_./][\p{L}\p{N}]+)*/gu) || [];
  const keys = new Set(tokens.map(identityText));
  return products.filter((product) => product.sku && keys.has(identityText(product.sku)));
}
