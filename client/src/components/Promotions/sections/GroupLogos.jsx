import { ShoppingBasket } from "lucide-react";

import brandList from "../../../data/brands";

// لوگوی برندهای یک گروه؛ گروه بدون برند (سبدها) آیکن سبد می‌گیره
function GroupLogos({ brands }) {
  const logos = brandList.filter((brand) => brands.includes(brand.name) && brand.image);

  if (logos.length === 0) {
    return (
      <span className="w-14 h-14 flex items-center justify-center rounded-xl bg-white text-amber-600">
        <ShoppingBasket size={30} aria-hidden="true" />
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {logos.map((brand) => (
        <img
          key={brand.name}
          src={brand.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-14 h-14 object-contain bg-white rounded-xl p-1"
        />
      ))}
    </div>
  );
}

export default GroupLogos;
