import { getAtfType, isAtfProduct } from "./atfType";
import { getBrakeFluidStandard, isBrakeFluid } from "./brakeFluidStandard";

// محصولاتی که گرید و API ندارن و کارتشون به‌جاش یک مشخصه‌ی نوع نشون می‌ده:
// روغن گیربکس اتوماتیک → نوع (CVT، DCT...)، روغن ترمز → استاندارد (DOT3، DOT4).
// برای بقیه‌ی محصولات null برمی‌گرده و کارت همون گرید و API رو نشون می‌ده.
export function getProductTypeSpec(product) {
  if (isAtfProduct(product)) {
    return { labelKey: "common.atfType", value: getAtfType(product) };
  }
  if (isBrakeFluid(product)) {
    return { labelKey: "common.brakeStandard", value: getBrakeFluidStandard(product) };
  }
  return null;
}
