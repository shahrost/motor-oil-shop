const priceRanges = [
  {
    id: "under-300k",
    label: "تا ۳۰۰ هزار تومان",
    labelEn: "Up to 300,000 Toman",
    min: 0,
    max: 300000,
  },
  {
    id: "300k-700k",
    label: "۳۰۰ تا ۷۰۰ هزار تومان",
    labelEn: "300,000 to 700,000 Toman",
    min: 300000,
    max: 700000,
  },
  {
    id: "700k-1500k",
    label: "۷۰۰ هزار تا ۱.۵ میلیون تومان",
    labelEn: "700,000 Toman to 1.5 Million Toman",
    min: 700000,
    max: 1500000,
  },
  {
    id: "over-1500k",
    label: "بالای ۱.۵ میلیون تومان",
    labelEn: "Over 1.5 Million Toman",
    min: 1500000,
    max: Infinity,
  },
];

export default priceRanges;
