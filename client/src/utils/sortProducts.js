import {
  normalizeViscosity,
  normalizeApi,
  compareVolumes,
  toLatinDigits,
} from "./normalizeSpec";
import getMenuCategorySlug from "./classifyMenuCategory";
import { isBrakeFluid } from "./brakeFluidStandard";

// Most of the catalog was shortened to one generic name per category (e.g.
// "معدنی"), so it's identical across volumes and useless for grouping. A few
// brands (Behtam) still carry their real Latin model name with the volume
// baked in ("RENOVATION SL 10W40 1L" / "... 5L") — strip that trailing
// volume so different volumes of the same model line share a key, without
// merging genuinely different lines (e.g. QUANTIC vs RENOVATION) that
// happen to share a grade.
function stripTrailingVolume(name) {
  return (name || "")
    .trim()
    .toLowerCase()
    .replace(/\s*\d+(\.\d+)?\s*(l|cc|kg|g|lb)\s*$/i, "");
}

// Products of the same brand + category (e.g. motorcycle oil, gear oil) form a
// visual cluster; within that cluster, same line + grade + standards belong
// together and should be listed together, ordered by volume.
export function getProductGroupKey(product) {
  return [
    product.brand,
    (product.category || "").trim().toLowerCase(),
    stripTrailingVolume(product.name),
    normalizeViscosity(product.viscosity),
    normalizeApi(product.api),
    normalizeApi(product.acea),
    (product.oilType || "").trim().toLowerCase(),
  ].join("|");
}

// Display order of product kinds in every listing (and so in each brand row):
// gasoline, diesel and motorcycle engine oils, then gear oils, brake fluids,
// antifreeze; everything else after. Engine oils (ranks below GEAR_RANK) are
// also ordered by grade.
const GASOLINE_RANK = 0;
const DIESEL_RANK = 1;
const MOTORCYCLE_RANK = 2;
const GEAR_RANK = 3;
const BRAKE_FLUID_RANK = 4;
const ANTIFREEZE_RANK = 5;
const OTHER_RANK = 6;

const KIND_RANKS = {
  "gasoline-engine-oil": GASOLINE_RANK,
  "diesel-engine-oil": DIESEL_RANK,
  "motorcycle-oil": MOTORCYCLE_RANK,
  "gear-oil": GEAR_RANK,
  "extreme-pressure-gear-oil": GEAR_RANK,
  "automatic-transmission": GEAR_RANK,
  antifreeze: ANTIFREEZE_RANK,
  coolant: ANTIFREEZE_RANK,
};

// Some brands (Woofer, part of Behtam) have no menu category, so the name decides.
// Order matters: motorcycle and diesel before the generic «روغن موتور».
const NAME_RANKS = [
  { pattern: /روغن موتور ?سیکلت/, rank: MOTORCYCLE_RANK },
  { pattern: /روغن موتور.*دیزل/, rank: DIESEL_RANK },
  { pattern: /روغن موتور/, rank: GASOLINE_RANK },
  { pattern: /روغن (?:دنده|گیربکس)/, rank: GEAR_RANK },
  { pattern: /ضد ?یخ|کولانت/, rank: ANTIFREEZE_RANK },
];

function getKindRank(product) {
  if (isBrakeFluid(product)) return BRAKE_FLUID_RANK;

  // A known category that isn't listed (e.g. «مکمل روغن موتور») stays in "other"
  const slug = getMenuCategorySlug(product);
  if (slug !== "other") return KIND_RANKS[slug] ?? OTHER_RANK;

  const name = product.name || "";
  return NAME_RANKS.find(({ pattern }) => pattern.test(name))?.rank ?? OTHER_RANK;
}

// Engine oil grade as [winter, hot] so 0W-20 < 5W-30 < 10W-40 < 20W-50.
// A monograde (SAE 40) counts as [40, 40]; no grade sorts last. Some brands
// only carry the grade in the name ("RENOVATION SL 10W40 1L").
const GRADE_PATTERN = /\b(\d{1,2})\s?W\s?-?\s?(\d{2})\b/i;
const MONOGRADE_PATTERN = /\bSAE\s?(\d{1,2})\b/i;
const NO_GRADE = [Infinity, Infinity];

function getGradeKey(product) {
  for (const text of [product.viscosity, product.name]) {
    const value = toLatinDigits(text);
    const multi = value.match(GRADE_PATTERN);
    if (multi) return [Number(multi[1]), Number(multi[2])];
    const mono = value.match(MONOGRADE_PATTERN);
    if (mono) return [Number(mono[1]), Number(mono[1])];
  }
  return NO_GRADE;
}

// Default listing order: product kind, engine oils by grade (low to high), then
// same-line products grouped together, smallest volume first.
export function sortProductsDefault(products) {
  const keys = new Map(
    products.map((product) => {
      const rank = getKindRank(product);
      return [
        product,
        {
          rank,
          grade: rank < GEAR_RANK ? getGradeKey(product) : NO_GRADE,
          group: getProductGroupKey(product),
        },
      ];
    }),
  );

  return [...products].sort((a, b) => {
    const keyA = keys.get(a);
    const keyB = keys.get(b);

    if (keyA.rank !== keyB.rank) return keyA.rank - keyB.rank;

    for (let i = 0; i < 2; i += 1) {
      if (keyA.grade[i] !== keyB.grade[i]) {
        return keyA.grade[i] < keyB.grade[i] ? -1 : 1;
      }
    }

    if (keyA.group !== keyB.group) {
      return keyA.group < keyB.group ? -1 : 1;
    }

    return compareVolumes(a.volume, b.volume);
  });
}
